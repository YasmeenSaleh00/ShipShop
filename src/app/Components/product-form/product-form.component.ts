import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProduct } from '../../Interfaces/AddProduct';
import { BrandService } from '../../Services/brand.service';
import { Category } from '../../Interfaces/Category';
import { Brand } from '../../Interfaces/Brand';
import { Product } from '../../Interfaces/Product';
import { SubcategoryService } from '../../Services/subcategory.service';
import { ImageService } from '../../Services/image.service';
import { LookupService } from '../../Services/lookup.service';
import { LookupTypeModel } from '../../Interfaces/LookupTypeModel';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  products:AddProduct={
    name: '',
    description: '',
    price: 0,
    taxPercentage: 0,
    brandId: 0,
    imageUrl: '',
    descriptionAr: '',
    nameAr: '',
    quantity: 0,
    subCategoryId: 0,
    productStatusId: 0
  }
  product!:Product
  isEdit:boolean=false;
  category:Category[]=[];
  brand:Brand[]=[];
  selectedFile!: File;
 productStatuses: LookupTypeModel[] = []; 
constructor(private productService:ProductService,
  private route:ActivatedRoute,
  private router:Router,
  private brandService:BrandService,
  private subCategoryService:SubcategoryService,
  private imageService: ImageService,
  private lookupService:LookupService){}

  ngOnInit(): void {
    const lookupTypeId =1;
    if (lookupTypeId) {
      this.lookupService.getLookupItemValuesByType(+lookupTypeId).subscribe({
        next: (data) => {
         
          this.productStatuses = data;
        },
        error: (error) => {
          console.error('Error fetching lookup statuses:', error);
        }
      });
    }
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)

    if (id) {
      this.isEdit = true;
      this.productService.getProductById(+id).subscribe(data => {
        this.product = data;
      
     
      });    }
    this.subCategoryService.getSubCategories().subscribe(data => this.category = data);
    this.brandService.getBrands().subscribe(data => this.brand = data);
   
    
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

    }
  }
  onSubmit(form: any): void {
    if (form.invalid) return;


    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe({
        next: (uploadedImageName: string) => {
          this.products.imageUrl = uploadedImageName; 
          this.saveProduct();
        },
        error: (err) => {
          console.error('خطأ أثناء رفع الصورة', err);
        }
      });
    } else {
   
      this.products.imageUrl = this.product.imageUrl;
      this.saveProduct();
    }
  }
  private saveProduct(): void {
    if (this.isEdit) {
      this.productService.updateProduct(this.product.id, this.products).subscribe({
        next: () => this.router.navigate(['/product']),
        error: (err) => console.error('خطأ أثناء تعديل المنتج', err)
      });
    } else {
      this.productService.addProduct(this.products).subscribe({
        next: () => this.router.navigate(['/product']),
        error: (err) => console.error('خطأ أثناء إضافة المنتج', err)
      });
    }
  }


  


}



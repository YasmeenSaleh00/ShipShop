import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../Services/brand.service';
import { Category } from '../../Interfaces/Category';
import { Brand } from '../../Interfaces/Brand';
import { Product } from '../../Interfaces/Product';
import { SubcategoryService } from '../../Services/subcategory.service';
import { ImageService } from '../../Services/image.service';
import { LookupService } from '../../Services/lookup.service';
import { LookupTypeModel } from '../../Interfaces/LookupTypeModel';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  products:Product={
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
    productStatusId: 0,
    id: 0,
    categoryName: '',
    brandName: '',
    productStatus: '',
    createdOn: '',
    updatedOn: null,
    isActive: false
  }
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
          console.error( error);
        }
      });
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productService.getProductById(+id).subscribe(data => {
        this.products = data;
      
     
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
        next: (imageName: string) => {
          this.products.imageUrl = imageName; 
          this.saveProduct();
        },
        error: (err) => {
          console.error( err);
        }
      });
    } else {
   
      this.products.imageUrl = this.products.imageUrl;
      this.saveProduct();
    }
  }
  private saveProduct(): void {
  if (this.isEdit) {
    this.productService.updateProduct(this.products.id, this.products).subscribe({
      next: () => {
        Swal.fire({
          title: 'Updated Successfully 🎉',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'rgb(252, 148, 183)',
        }).then(() => {
          this.router.navigate(['/product']);
        });
      },
      error: (err) => console.error(err)
    });
  } else {
    this.productService.addProduct(this.products).subscribe({
      next: () => {
        Swal.fire({
          title: 'Added Successfully 🎉',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'rgb(252, 148, 183)',
        }).then(() => {
          this.router.navigate(['/product']);
        });
      },
      error: (err) => console.error(err)
    });
  }
}


}



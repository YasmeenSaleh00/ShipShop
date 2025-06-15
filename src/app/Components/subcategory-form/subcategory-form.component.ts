import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubcategoryService } from '../../Services/subcategory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategory } from '../../Interfaces/SubCategory';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Interfaces/Category';
import { ImageService } from '../../Services/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subcategory-form',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './subcategory-form.component.html',
  styleUrl: './subcategory-form.component.css'
})
export class SubcategoryFormComponent implements OnInit{
category:SubCategory={
  id: 0,
  name: " ",
  nameAr: "",
  description: "",
  descriptionAr: "",
  createdOn: '',
  updatedOn: null,
  isActive: true,
  imageUrl: '',
  categoryId: 0,
  mainCategory: ''
};
mainCategory:Category[]=[]
 isEdit=false;
 selectedFile!: File;
 
 constructor(private subCategoryService:SubcategoryService,
  private route:ActivatedRoute,
  private router:Router,
  private categoryService:CategoryService, 
  private imageService: ImageService
 ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.isEdit=true;
      this.subCategoryService.getSubCategoryById(+id).subscribe(data=>this.category=data);
    }
    this.categoryService.getCategories().subscribe(data=>this.mainCategory=data);
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

     
    }
  }
  onSubmit(form: any) {
    if (form.invalid) return;

    if (this.selectedFile) {
      // ارفع الصورة أولاً
      this.imageService.uploadImage(this.selectedFile).subscribe({
        next: (uploadedImageName:string) => {
          this.category.imageUrl = uploadedImageName; // خزن اسم الصورة
          this.saveCategory();
        },
        error: (err) => {
          console.error('خطأ أثناء رفع الصورة', err);
        }
      });
    } else {
      // لا يوجد صورة، كمل الحفظ
      this.saveCategory();
    }
  }
  private saveCategory() {
    if (this.isEdit) {
      this.subCategoryService.updateSubCategory(this.category.id, this.category).subscribe({
       next: () => {
                Swal.fire({
                                         title: 'Updated Successfully 🎉',
                                         icon: 'success',
                                         confirmButtonText: 'Ok',
                                         confirmButtonColor: 'rgb(252, 148, 183)', 
                                       }).then(()=>{
                    this.router.navigate(['/subcategory']);
                                       })
        },
        error: (err) => console.error('خطأ أثناء تعديل الكاتيجوري', err)
      });
    } else {
      this.subCategoryService.addSubCategory(this.category).subscribe({
   next: () => {
                Swal.fire({
                                         title: 'Added Successfully 🎉',
                                         icon: 'success',
                                         confirmButtonText: 'Ok',
                                         confirmButtonColor: 'rgb(252, 148, 183)', 
                                       }).then(()=>{
                    this.router.navigate(['/subcategory']);
                                       })
        },
        error: (err) => console.error('خطأ أثناء إضافة الكاتيجوري', err)
      });
    }
  }

}

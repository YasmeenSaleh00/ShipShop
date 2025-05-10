import { Component, OnInit } from '@angular/core';
import { Category } from '../../Interfaces/Category';
import { CategoryService } from '../../Services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ImageService } from '../../Services/image.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
 category:Category={
   id: 0,
   name: " ",
   nameAr: "",
   description: "",
   descriptionAr: "",
   createdOn: '',
   updatedOn: null,
   isActive: true,
   imageUrl: ''
 };
 isEdit=false;
 selectedFile!: File;

 constructor(private categoryService:CategoryService,
  private route:ActivatedRoute,
  private router:Router,
  private imageService: ImageService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.isEdit=true;
      this.categoryService.getCategoryById(+id).subscribe(data=>this.category=data);
    }
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
      this.categoryService.updateCategory(this.category.id, this.category).subscribe({
        next: () => this.router.navigate(['/category']),
        error: (err) => console.error('خطأ أثناء تعديل الكاتيجوري', err)
      });
    } else {
      this.categoryService.addCategory(this.category).subscribe({
        next: () => this.router.navigate(['/category']),
        error: (err) => console.error('خطأ أثناء إضافة الكاتيجوري', err)
      });
    }
  }

  
}

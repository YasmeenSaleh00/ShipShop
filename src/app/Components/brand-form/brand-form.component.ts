import { Component, OnInit } from '@angular/core';
import { Brand } from '../../Interfaces/Brand';
import { BrandService } from '../../Services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

import { ImageService } from '../../Services/image.service';

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent implements OnInit {
 brand:Brand={
  id: 0,
  name: " ",
  nameAr: "",
  imagePath:"",
  createdOn: '',
  updatedOn: null,
  isActive: true
 }
 isEdit=false;
 file:File|undefined;

 constructor(
 private brandService:BrandService,
 private route:ActivatedRoute,
 private router:Router,
 private imageService:ImageService){}


  ngOnInit(): void {
    const id =this.route.snapshot.paramMap.get('id');
    if(id){
      this.isEdit=true;
      this.brandService.getBrandById(+id).subscribe(data=>this.brand=data);
    }
  }
  onFileSelected(event:any){
    const file = event.target.files[0];
    if (file) {
      this.file = file;  // حفظ الملف المختار
    }

  }
  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.file) {
      // رفع الصورة أولاً عبر ImageService
      this.imageService.uploadImage(this.file).subscribe(
        (response) => {
          this.brand.imagePath = response; // حفظ رابط الصورة في الـ brand

          // إذا كان في وضع التعديل، نقوم بتحديث البراند
          if (this.isEdit) {
            this.brandService.updateBrand(this.brand.id, this.brand).subscribe(() => {
              this.router.navigate(['/brand']);
            });
          } else {
            // إضافة البراند
            this.brandService.addBrand(this.brand).subscribe(() => {
              this.router.navigate(['/brand']);
            });
          }
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    } else {
      // في حالة عدم وجود صورة، فقط إضافة أو تعديل البراند
      if (this.isEdit) {
        this.brandService.updateBrand(this.brand.id, this.brand).subscribe(() => {
          this.router.navigate(['/brand']);
        });
      } else {
        this.brandService.addBrand(this.brand).subscribe(() => {
          this.router.navigate(['/brand']);
        });
      }
  }

  }
}
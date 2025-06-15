import { Component, OnInit } from '@angular/core';
import { Brand } from '../../Interfaces/Brand';
import { BrandService } from '../../Services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

import { ImageService } from '../../Services/image.service';
import Swal from 'sweetalert2';

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
      this.file = file;  
    }

  }
  onSubmit(form: any) {
     if (form.invalid) return;
 
     if (this.file) {
       // ارفع الصورة أولاً
       this.imageService.uploadImage(this.file).subscribe({
         next: (uploadedImageName:string) => {
           this.brand.imagePath = uploadedImageName; // خزن اسم الصورة
           this.saveBrand();
         },
         error: (err) => {
           console.error('خطأ أثناء رفع الصورة', err);
         }
       });
     } else {
       // لا يوجد صورة، كمل الحفظ
       this.saveBrand();
     }
   }
   private saveBrand() {
     if (this.isEdit) {
       this.brandService.updateBrand(this.brand.id, this.brand).subscribe({
        next: () => {
                 Swal.fire({
                                          title: 'Updated Successfully 🎉',
                                          icon: 'success',
                                          confirmButtonText: 'Ok',
                                          confirmButtonColor: 'rgb(252, 148, 183)', 
                                        }).then(()=>{
                     this.router.navigate(['/brand']);
                                        })
         },
         error: (err) => console.error(err)
       });
     } else {
       this.brandService.addBrand(this.brand).subscribe({
    next: () => {
                 Swal.fire({
                                          title: 'Added Successfully 🎉',
                                          icon: 'success',
                                          confirmButtonText: 'Ok',
                                          confirmButtonColor: 'rgb(252, 148, 183)', 
                                        }).then(()=>{
                     this.router.navigate(['/brand']);
                                        })
         },
         error: (err) => console.error('خطأ أثناء إضافة الكاتيجوري', err)
       });
     }
   }
 

}

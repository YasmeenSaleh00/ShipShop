import { Component } from '@angular/core';
import { TestimonialService } from '../../Services/testimonial.service';
import { Testimonial } from '../../Interfaces/Testimonial';
import { TokenService } from '../../Services/token.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testimonial-form',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './testimonial-form.component.html',
  styleUrl: './testimonial-form.component.css'
})
export class TestimonialFormComponent {
 constructor(private testimonialService:TestimonialService,private tokenService:TokenService,private router:Router){}

 testimonial:Testimonial={
   id: 0,
   name: '',
   description: '',
   rating: 0,
   createdOn: null,
   customerId: 0
 }

onSubmit(form:any){
  this.testimonial.customerId= this.tokenService.getUserId();
  this.testimonialService.createTestimonial(this.testimonial).subscribe({
    next: () =>{
      Swal.fire({
              title: 'Send Successfully 🎉',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: 'rgb(252, 148, 183)', 
            }).then(()=>{
              form.reset()
            })
    }
  })
}
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password-form',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.css'
})
export class ForgotPasswordFormComponent {
  email: string = '';
  newPassword: string = '';
isEmailValid: boolean = false;
  isPasswordFormVisible: boolean = false;  
  constructor(private customerService:CustomerService,private router:Router){}
 verifyEmail() {
    this.customerService.verifyEmail(this.email).subscribe(
      (response) => {
        this.isEmailValid = true;
        this.isPasswordFormVisible = true;
      },
      (error) => {
      
        this.isEmailValid = false;
        this.isPasswordFormVisible = false;
         Swal.fire({
                 title: 'Email not found. Please check your email address.',
                 icon: 'error',
                 confirmButtonText: 'Ok',
                 confirmButtonColor: 'rgb(252, 148, 183)',
               })
        }
    )
  }
       
     


  updatePassword() {
    if (this.newPassword) {
      this.customerService.updatePassword(this.email, this.newPassword).subscribe(
        (response) => {
           Swal.fire({
                  title: 'Password Updated Successfully 🎉',
                  icon: 'success',
                  confirmButtonText: 'Ok',
                  confirmButtonColor: 'rgb(252, 148, 183)',
                }).then(() => {
                  this.router.navigate(['/login']);
                });
         
          
        },
            (error) => {
          Swal.fire({
                 title: 'Error updating password',
                 icon: 'error',
                 confirmButtonText: 'Ok',
                 confirmButtonColor: 'rgb(252, 148, 183)',
               })
        }
      );
    }
  }
}

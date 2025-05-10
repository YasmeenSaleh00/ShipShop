import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { CommonModule } from '@angular/common';


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
        alert('Email not found. Please check your email address.');
      }
    );
  }


  updatePassword() {
    if (this.newPassword) {
      this.customerService.updatePassword(this.email, this.newPassword).subscribe(
        (response) => {
          alert('Password updated successfully');
            this.router.navigate(['/login']);
          
        },
        (error) => {
          alert('Error updating password');
        }
      );
    }
  }
}

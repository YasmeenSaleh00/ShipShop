import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { updateUserPassword } from '../../Interfaces/UpdateUserPassword';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-user-password',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './edit-user-password.component.html',
  styleUrl: './edit-user-password.component.css'
})
export class EditUserPasswordComponent implements OnInit {
user:updateUserPassword={
  newPassword:'',
  confirmPassword:''
}
  constructor(private userService:UserService, private route:ActivatedRoute,private router:Router){}
 
  ngOnInit(): void {
   
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(+id).subscribe(data => {
       
      });
    }
  }
  onSubmit(form: any): void {
    if (form.invalid) return;
  
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      
      if (this.user.newPassword !== this.user.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      this.userService.updateUserPassword(+id, this.user).subscribe(
        (response) => {
          console.log('Password updated successfully');
          this.router.navigate(['/user']);
        },
        (error) => {
          console.error('Error updating password:', error);
        }
      );
    }
  }
  
}
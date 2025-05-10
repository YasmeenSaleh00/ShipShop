import { Component } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { Router, RouterLink } from '@angular/router';

import { AddCustomer } from '../../Interfaces/AddCustomer';
import { FormsModule, NgModel } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [FormsModule,NgIf,RouterLink],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {
constructor(private customerService:CustomerService,private router:Router){}
customer:AddCustomer={
  firstName:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:''
}
passwordError:boolean=false;
onSubmit(form:any){
  if(form.invalid)
    return;
  if(this.customer.password != this.customer.confirmPassword){
    this.passwordError=true;
   return;
  }
  this.passwordError=false;
  this.customerService.singUp(this.customer).subscribe(()=>{
    this.router.navigate(['/login']);
  })
}
}

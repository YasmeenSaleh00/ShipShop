
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { NgIf } from '@angular/common';
import { UpdateCustomer } from '../../Interfaces/UpdateCustomer';
import { TokenService } from '../../Services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
constructor(private customerService:CustomerService,private router:Router,private route:ActivatedRoute,private tokenService:TokenService){}

customer:UpdateCustomer={
  id:0,
  firstName:'',
  lastName:'',
  email:'',

}
ngOnInit(): void {
     const userId = this.tokenService.getUserId();
  if(userId){

    this.customerService.getCustomerById(userId).subscribe(data=>this.customer=data);
  }
}
onSubmit(form: any) {
  if (form.invalid) return;

  this.customerService.updateCustomer(this.customer.id, this.customer)
    .subscribe({
      next: () => {
      Swal.fire({
                                   title: 'Updated Successfully 🎉 ',
                                   icon: 'success',
                                   confirmButtonText: 'Ok',
                                   confirmButtonColor: 'rgb(252, 148, 183)', 
                                 }).then(()=>{
    this.router.navigate(['/account']);
                                 })
    
      },
      error: (err) => {
             Swal.fire({
                                   title: 'Updated Failed  ',
                                   icon: 'error',
                                   confirmButtonText: 'Ok',
                                   confirmButtonColor: 'rgb(252, 148, 183)', 
                                 })
   
      }
    });
}

}

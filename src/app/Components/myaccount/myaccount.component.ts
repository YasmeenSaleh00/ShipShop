import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { CustomerOrderComponent } from "../customer-order/customer-order.component";

import { AccountDetailsComponent } from "../account-details/account-details.component";
import { NgIf } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { TestimonialCustomerComponent } from "../testimonial-customer/testimonial-customer.component";
import { Customer } from '../../Interfaces/Customer';


@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [RouterLink, CustomerOrderComponent, AccountDetailsComponent, NgIf, TestimonialCustomerComponent],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css'
})
export class MyaccountComponent implements OnInit  {
  activeTab: string = '';


constructor(private customerService:CustomerService,private authService:AuthService,private router:Router){}
ngOnInit(): void {
  this.setTab('account-details'); 

}
  setTab(tabName: string) {
    this.activeTab = tabName;
  }
logOut(){
this.authService.logOut();
this.router.navigate(['/login']);
}
}



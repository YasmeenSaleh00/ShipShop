import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { Router, RouterLink } from '@angular/router';
import { CustomerOrderComponent } from "../customer-order/customer-order.component";

import { AccountDetailsComponent } from "../account-details/account-details.component";
import { NgIf } from '@angular/common';
import { AuthService } from '../../Services/auth.service';
import { TestimonialCustomerComponent } from "../testimonial-customer/testimonial-customer.component";


@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [RouterLink, CustomerOrderComponent, AccountDetailsComponent, NgIf, TestimonialCustomerComponent],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css'
})
export class MyaccountComponent implements OnInit  {
  activeTab: string = '';

  setTab(tabName: string) {
    this.activeTab = tabName;
  }
constructor(private customerService:CustomerService,private authService:AuthService,private router:Router){}
ngOnInit(): void {
  this.setTab('account-details'); 
}
logOut(){
this.authService.logOut();
this.router.navigate(['/login']);
}
}



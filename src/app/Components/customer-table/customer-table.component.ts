import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { Customer } from '../../Interfaces/Customer';
import { NgFor } from '@angular/common';
import { RoleDirective } from '../../Directive/role.directive';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [NgFor,RoleDirective,RouterLink],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.css'
})
export class CustomerTableComponent implements OnInit {

  customer:Customer[]=[];
  constructor(private customerService:CustomerService){}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data=>this.customer=data);
  }

  banCustomer(id: number) {
    this.customerService.banCustomer(id).subscribe({
      next: () => {
      Swal.fire({
        title: 'Banned Successfully ✅',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'rgb(252, 148, 183)',
      }).then(() => {
   
        this.customerService.getCustomers().subscribe(data=>this.customer=data);
      });
    },
    error: (err) => {
      Swal.fire({
        title: 'An error occurred',
        text: 'Please try again later.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      console.error(err);
    }
    });
  }
  activeCustomer(id:number){
    this.customerService.activeCustomer(id).subscribe({
 next: () => {
      Swal.fire({
        title: 'Activated Successfully ✅',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'rgb(252, 148, 183)',
      }).then(() => {
   
        this.customerService.getCustomers().subscribe(data=>this.customer=data);
      });
    },
    error: (err) => {
      Swal.fire({
        title: 'An error occurred',
        text: 'Please try again later.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      console.error(err);
    }
  });
}
 

sortByCreationDate(sortDirection:string){
this.customerService.sortByCreationDate(sortDirection).subscribe(data=>this.customer=data);
}
sortByName(sortDirection:string){
  this.customerService.sortByName(sortDirection).subscribe(data=>this.customer=data);

}
sortByEmail(sortDirection:string){
  this.customerService.sortByEmail(sortDirection).subscribe(data=>this.customer=data);

}
sortById(sortDirection:string){
  this.customerService.sortById(sortDirection).subscribe(data=>this.customer=data);

}
}

import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { Customer } from '../../Interfaces/Customer';
import { NgFor } from '@angular/common';
import { RoleDirective } from '../../Directive/role.directive';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [NgFor,RoleDirective],
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
    this.customerService.banCustomer(id).subscribe(() => {
      alert('Banned Successfully ✅');
    });
  }
  activeCustomer(id:number){
    this.customerService.activeCustomer(id).subscribe(()=>{
      alert('Activated Successfully ✅ ')
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

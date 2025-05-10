import { Component, OnInit } from '@angular/core';
import { RoleDirective } from '../../Directive/role.directive';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';
import { OrderService } from '../../Services/order.service';
import { OrderModel } from '../../Interfaces/OrderModel';
import { LookupService } from '../../Services/lookup.service';


@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [RoleDirective,NgFor,RouterLink,CurrencyPipe],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.css'
})
export class OrderTableComponent implements OnInit {
  order:OrderModel[]|null=null;
constructor(private orderService:OrderService){}
  ngOnInit(): void {

   this.orderService.getAllOrders().subscribe(data=>this.order=data);
  }
  sortByCreationDate(sortDirection:string){
    this.orderService.sortByCreationDate(sortDirection).subscribe(data=>this.order=data);
    }
    sortByCustomerName(sortDirection:string){
      this.orderService.sortByName(sortDirection).subscribe(data=>this.order=data);
    
    }
   
    sortById(sortDirection:string){
      this.orderService.sortById(sortDirection).subscribe(data=>this.order=data);
    
    }
    sortByDeliveryDate(sortDirection:string){
      this.orderService.sortByDeliveryDate(sortDirection).subscribe(data=>this.order=data);
    }
}

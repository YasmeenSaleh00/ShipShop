import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { TokenService } from '../../Services/token.service';
import { OrderModel } from '../../Interfaces/OrderModel';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-customer-order',
  standalone: true,
  imports: [NgFor],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.css'
})
export class CustomerOrderComponent implements OnInit {
constructor(private orderService:OrderService, private tokenService:TokenService){}

order:OrderModel[] | null=null;

ngOnInit(): void {
    const customerId = this.tokenService.getUserId();
    this.orderService.getAllOrdersByCustomerId(customerId).subscribe(data=>this.order=data);
}
}

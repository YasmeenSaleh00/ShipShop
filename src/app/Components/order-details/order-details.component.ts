import { Component } from '@angular/core';
import { OrderItem } from '../../Interfaces/OrderItem';
import { OrderService } from '../../Services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderModel } from '../../Interfaces/OrderModel';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [NgFor,CurrencyPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
 order:OrderModel|null=null;
constructor(private orderService:OrderService,private route:ActivatedRoute){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
   this.orderService.getOrderById(+id).subscribe(data=>this.order=data);
  }
}

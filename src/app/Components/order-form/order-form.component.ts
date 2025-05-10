import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { TokenService } from '../../Services/token.service';
import { CreateOrder } from '../../Interfaces/CreateOrder';
import {   Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { OrderModel } from '../../Interfaces/OrderModel';
import { CartService } from '../../Services/cart.service';
import { CartModel } from '../../Interfaces/CartModel';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [FormsModule, RouterLink,NgIf],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent   {
order:CreateOrder={
  customerName: '',
  phone: '',
  shippingAddress: '',
  note: null
}


  constructor(private orderService:OrderService,private tokenService:TokenService,private router:Router,){}
 


  onSubmit(form:any){
    if(form.invalid)
      return ;
    const customerId=this.tokenService.getUserId();
    this.orderService.createOrder(this.order,customerId).subscribe({
      next:()=>{
        alert('Order Created Successfully');
        this.router.navigate(['/home']);
      },
      error:(err)=>{
        console.log(err)
      }
      
    })
  }
  


}

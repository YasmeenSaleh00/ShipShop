import { Component, OnInit } from '@angular/core';
import { CartModel } from '../../Interfaces/CartModel';
import { CartService } from '../../Services/cart.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { TokenService } from '../../Services/token.service';
import { RouterLink } from '@angular/router';
import {  FormsModule } from '@angular/forms';
import { CartItemModel } from '../../Interfaces/CartItemModel';




@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,CurrencyPipe,RouterLink,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: CartModel | null = null;

 
  constructor(private cartService: CartService,private tokenService: TokenService
) {}

  ngOnInit(): void {
 

    const customerId = this.tokenService.getUserId();
  
  
    if(customerId ){
      this.cartService.getCartByCustomerId(customerId).subscribe({
        next: (data) => {
          this.cart = data;
  

        },
        error: (err) => {
          console.error('Error fetching cart:', err);
        }
      });
    }
 
  }
  removeFromCart(cartId: number , productId: number) {
    if (cartId != null) {
      this.cartService.removeFromCart(cartId, productId).subscribe({
        next: () => {
          if (this.cart) {
            this.cart.items = this.cart.items.filter(item => item.productId !== productId);
          }
          alert('Removed From Cart Successfully');
        },
        error: (err) => {
          console.error('Error removing item from cart:', err);
        }
      });
    }
  }
  loadCart() {
    const customerId = this.tokenService.getUserId();
    if(customerId) {
      this.cartService.getCartByCustomerId(customerId).subscribe({
        next: (data) => {
          this.cart = data;
        },
        error: (err) => {
          console.error('Error fetching cart:', err);
        }
      });
    }
  }
  updateQuantity(productId: number, quantity: number) {
    const customerId=this.tokenService.getUserId()
    this.cartService.updateCartItemQuantity({customerId,productId,quantity}).subscribe({
      next: () => {
        console.log(' Updated Successfully ✅');
        if (this.cart) {
          const item = this.cart.items.find(item => item.productId === productId);
          if (item) {
            item.quantity = quantity;
          }
        }
      },
      error: (err) => {
        console.error(' Error ❌', err);
        alert(' There is an Error ❌');
      }
    });
  }
  

  getCartSubtotal(): number {
    return this.cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;
  }
  

  onQuantityChange(newQuantity: number, item: CartItemModel) {
    item.quantity = newQuantity;
    this.updateQuantity(item.productId, newQuantity); 
  }
  
}

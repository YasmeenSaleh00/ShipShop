import { Component, OnInit } from '@angular/core';
import { CartModel } from '../../Interfaces/CartModel';
import { CartService } from '../../Services/cart.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { TokenService } from '../../Services/token.service';
import { RouterLink } from '@angular/router';
import {  FormsModule } from '@angular/forms';
import { CartItemModel } from '../../Interfaces/CartItemModel';
import Swal from 'sweetalert2';




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
     Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.cartService.removeFromCart(cartId,productId).subscribe(() => {
                 
                       if (this.cart) {
            this.cart.items = this.cart.items.filter(item => item.productId !== productId);
          }
                      Swal.fire({
                        title: "Deleted!",
                        text: "Deleted successfully.",
                        icon: "success"
                      });
                    }, error => {
                      Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error"
                      });
                    });
                  }
                });
   
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
 
         
        if (this.cart) {
          const item = this.cart.items.find(item => item.productId === productId);
          if (item) {
            item.quantity = quantity;
          }
        }
                Swal.fire({
                             title: 'Updated Successfully ✅',
                             icon: 'success',
                             confirmButtonText: 'Ok',
                             confirmButtonColor: 'rgb(252, 148, 183)', 
                           })
      },
      error: (err) => {
     Swal.fire({
                             title: 'There is an Error ❌',
                             icon: 'error',
                             confirmButtonText: 'Ok',
                             confirmButtonColor: 'rgb(252, 148, 183)', 
                           })
      
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

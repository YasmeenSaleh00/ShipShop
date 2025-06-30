import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WishlistService } from '../../Services/wishlist.service';
import { WishList } from '../../Interfaces/WishList';
import { TokenService } from '../../Services/token.service';
import { CartService } from '../../Services/cart.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor,RouterLink,CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

wishList:WishList | null=null;

constructor(private wishlistService:WishlistService ,
   private tokenService:TokenService,
  private cartService:CartService){}

ngOnInit(): void {
const customerId = this.tokenService.getUserId();
if(customerId != null)
this.wishlistService.getWishListByCustomerId(customerId).subscribe({
  next: (data) => {
this.wishList=data;
  },
  error: (err) => {
    console.error('Error fetching wishlist:', err);
  }
});
}

removeFromWishList(wishId:number,productId:number){
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
                    this.wishlistService.removeFromeWishList(wishId,productId).subscribe(() => {
                 
                       if (this.wishList) {
            this.wishList.wishListItems = this.wishList.wishListItems.filter(item => item.productId !== productId);
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
onAddToCart(productId: number) {
  const quantity = 1;
  const customerId = this.tokenService.getUserId();

  this.cartService.addToCart({ customerId, productId, quantity }).subscribe({
    next: (res) => {
    Swal.fire({
                   title: 'Added To Cart  Successfully 🎉',
                   icon: 'success',
                   confirmButtonText: 'Ok',
                   confirmButtonColor: 'rgb(252, 148, 183)', 
                 }).then(()=>{
         if(this.wishList)
      this.wishList.wishListItems = this.wishList.wishListItems.filter(item => item.productId !== productId);
                 });
    
      
    },
    error: (err) => {
      Swal.fire({
                   title: 'There is an Problem  ❌ ',
                   icon: 'error',
                   confirmButtonText: 'Ok',
                   confirmButtonColor: 'rgb(252, 148, 183)', 
                 })

    }
  });
}
}



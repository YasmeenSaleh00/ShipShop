import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WishlistService } from '../../Services/wishlist.service';
import { WishList } from '../../Interfaces/WishList';
import { TokenService } from '../../Services/token.service';
import { CartService } from '../../Services/cart.service';


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
if(wishId != null)
  this.wishlistService.removeFromeWishList(wishId,productId).subscribe({
   next:()=>{
    if(this.wishList)
      this.wishList.wishListItems = this.wishList.wishListItems.filter(item => item.productId !== productId);
    alert('Removed  Successfully')
   },
   
   error:(err)=>{
         console.log(err);
   }
   
  })
}
onAddToCart(productId: number) {
  const quantity = 1;
  const customerId = this.tokenService.getUserId();

  this.cartService.addToCart({ customerId, productId, quantity }).subscribe({
    next: (res) => {
      console.log('Added ', res);
      alert('Added To Cart Successfully 🎉  ');
      
    },
    error: (err) => {
     
      alert('  There is an Problem  ❌ ');
    }
  });
}
}



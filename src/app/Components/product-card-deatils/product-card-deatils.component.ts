import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Interfaces/Product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { TokenService } from '../../Services/token.service';
import { CartModel } from '../../Interfaces/CartModel';
import { FormsModule } from '@angular/forms';
import { WishList } from '../../Interfaces/WishList';
import { WishlistService } from '../../Services/wishlist.service';
import { AuthService } from '../../Services/auth.service';
import { RoleDirective } from '../../Directive/role.directive';

@Component({
  selector: 'app-product-card-deatils',
  standalone: true,
  imports: [CurrencyPipe,RouterLink,FormsModule,RoleDirective],
  templateUrl: './product-card-deatils.component.html',
  styleUrl: './product-card-deatils.component.css'
})
export class ProductCardDeatilsComponent implements OnInit {
constructor(private productService:ProductService,
  private route:ActivatedRoute,
  private cartService:CartService,
  private tokenService:TokenService,
private wishListService:WishlistService,
private router:Router,
private authservice:AuthService){}

products:Product| null =null;
cart:CartModel | null=null;
quantity: number = 1;
wishList:WishList|null=null
ngOnInit(): void {
  const id=this.route.snapshot.paramMap.get('id');
  if(id)
 this.productService.getProductById(+id).subscribe(data=>this.products=data)
}
loadCart() {
  const customerId = this.tokenService.getUserId();
  this.cartService.getCartByCustomerId(customerId).subscribe({
    next: (res) => {
      this.cart = res;
   
    },
    error: (err) => {
      console.error( err);
    }
  });
}

addToCart(productId: number,quantity:number){
    if (!this.authservice.getToken()) {
    this.router.navigate(['/login']);
    return;
  }
  const customerId = this.tokenService.getUserId();
  this.cartService.addToCart({customerId,productId,quantity}).subscribe({
    next: (res) => {
      console.log('Added ', res);
      alert('Added To Cart Successfully 🎉  ');
      this.loadCart(); 
    },
    error: (err) => {
     
  alert('There was an error adding to cart ❌');
    }
  });
}
loadWishList(){
  const customerId= this.tokenService.getUserId();
  this.wishListService.getWishListByCustomerId(customerId).subscribe({
    next:(response)=>{
      this.wishList=response;
    },
    error: (err) => {
      console.error( err);
    }

  });
}
addToWishList(productId: number){
  const customerId = this.tokenService.getUserId();
      if (!this.authservice.getToken()) {
    this.router.navigate(['/login']);
    return;
  }
this.wishListService.addToWishList({customerId,productId}).subscribe({
  next: (res) => {
    console.log('Added ', res);
    alert('Added To WishList Successfully 🎉  ');
    this.loadWishList(); 
  },
  error: (err) => {
  alert('Already Exists in WishList ❌');

  }
});
}
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Interfaces/Product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CartService } from '../../Services/cart.service';
import { TokenService } from '../../Services/token.service';
import { CartModel } from '../../Interfaces/CartModel';
import { WishlistService } from '../../Services/wishlist.service';
import { WishList } from '../../Interfaces/WishList';
import { AuthService } from '../../Services/auth.service';
import { RoleDirective } from '../../Directive/role.directive';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor,CurrencyPipe,RouterLink,RoleDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {

  product:Product[]=[];
  cart:CartModel | null=null;
  wishList:WishList|null=null;
  constructor(private productService:ProductService,
    private route:ActivatedRoute,
    private cartService:CartService,
    private tokenService:TokenService,
    private wishListService:WishlistService,
  private router:Router,
private authservice:AuthService){}
  ngOnInit(): void {
    const brandName = this.route.snapshot.paramMap.get('brandName');
    const categoryName = this.route.snapshot.paramMap.get('categoryName');
  
    if (categoryName) {
      this.productService.getProductByCategory(categoryName).subscribe(data => this.product = data);
    } 
    else if (brandName) {
      this.productService.getProductByBrandName(brandName).subscribe(data => this.product = data);
    }
    else{
      this.productService.getProducts().subscribe(data=>this.product=data);
    }
    this.route.queryParams.subscribe(params => {
      const keyword = params['keyword'];
      if (keyword) {
        this.productService.searchProducts(keyword).subscribe(products => {
          this.product = products;
        });
      }
    });
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
  onAddToCart(productId: number) {
    const quantity = 1;
    const customerId = this.tokenService.getUserId();
  if (!this.authservice.getToken()) {
    this.router.navigate(['/login']);
    return;
  }
    this.cartService.addToCart({ customerId, productId, quantity }).subscribe({
      next: (res) => {
        console.log('Added ', res);
        alert('Added To Cart Successfully 🎉  ');
        this.loadCart(); 
      },
      error: (err) => {
       
  alert('There was an error adding to cart ❌');      }
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
  
  AddToWishList(productId:number){
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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Interfaces/Product';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Interfaces/Category';
import { Brand } from '../../Interfaces/Brand';
import { BrandService } from '../../Services/brand.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartModel } from '../../Interfaces/CartModel';
import { WishList } from '../../Interfaces/WishList';
import { CartService } from '../../Services/cart.service';
import { WishlistService } from '../../Services/wishlist.service';
import { TokenService } from '../../Services/token.service';
import { SubCategory } from '../../Interfaces/SubCategory';
import { SubcategoryService } from '../../Services/subcategory.service';
import { Testimonial } from '../../Interfaces/Testimonial';
import { TestimonialService } from '../../Services/testimonial.service';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,CurrencyPipe,RouterLink,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  product:Product[]=[];
  category:Category[]=[];
  subCategories:SubCategory|null=null;
  brand:Brand[]=[];
  cart:CartModel | null = null;
  wishList:WishList | null = null
  testimonial:Testimonial[]=[];
  nameBrand:string=''
constructor(private productService:ProductService,
  private categoryService:CategoryService,
  private brandService:BrandService,
  private cartService:CartService,
  private wishListService:WishlistService,
  private tokenService:TokenService,
  private testmonialService:TestimonialService,
  private router:Router,
  private authservice:AuthService
){
  
}
  ngOnInit(): void {
    
   this.productService.sortByCreationDate('desc').subscribe(data=>this.product=data);
   this.categoryService.getCategories().subscribe(data=>this.category=data);
   this.brandService.getBrands().subscribe(data=>this.brand=data);
   this.testmonialService.sortByRating('desc').subscribe(data=>this.testimonial=data);
   this.productService.getProductByBrandName(this.nameBrand).subscribe(data=>this.product=data);
 

  }
  addToCart(productId:number){
    const customerId = this.tokenService.getUserId();
    const quantity = 1;
     if (!this.authservice.getToken()) {
    this.router.navigate(['/login']);
    return;
  }
    this.cartService.addToCart({customerId,productId,quantity}).subscribe({
      next:(res)=>{
        this.cart=res;
        
         Swal.fire({
        title: 'Added To Cart Successfully 🎉',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'rgb(252, 148, 183)', 
      })
      
      },
      error:(err)=>{
         Swal.fire({
                title: 'There was an error adding to cart ❌',
                text: 'Try Again  ',
                icon: 'error',
                confirmButtonText: 'Ok'
              });

      }
    })
  }
  addToWishList(productId:number){
    const customerId = this.tokenService.getUserId();
 if (!this.authservice.getToken()) {
    this.router.navigate(['/login']);
    return;
  }
  
    this.wishListService.addToWishList({customerId,productId}).subscribe({
      next:(res)=>{
        this.cart=res;
              Swal.fire({
        title: 'Added To WishList Successfully 🎉',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'rgb(252, 148, 183)', 
      })
      
       
      },
      error:(err)=>{
         Swal.fire({
                title: 'Already Exists in WishList ❌',
           
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: 'rgb(252, 148, 183)', 
              });
     
      }
    })
  }

 
}


import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../Interfaces/Product';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RoleDirective } from '../../Directive/role.directive';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [NgFor,RouterLink,CurrencyPipe,RoleDirective],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements OnInit {
  products:Product[]=[];
constructor(private productService:ProductService,router:Router){}


  ngOnInit(): void {
this.productService.getProducts().subscribe(data=>this.products=data);
  }
  
  sortByCreationDate(sortDirection:string){
    this.productService.sortByCreationDate(sortDirection).subscribe(data=>this.products=data);
    }
    sortByName(sortDirection:string){
      this.productService.sortByName(sortDirection).subscribe(data=>this.products=data);
    
    }
    sortByPrice(sortDirection:string){
      this.productService.sortByPrice(sortDirection).subscribe(data=>this.products=data);
    
    }
    sortById(sortDirection:string){
      this.productService.sortById(sortDirection).subscribe(data=>this.products=data);
    
    }
    deleteProduct(id:number){
      this.productService.deleteProduct(id).subscribe(()=>{
        this.products=this.products.filter(p=>p.id !== id);
    });
  }
 
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../Interfaces/Product';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RoleDirective } from '../../Directive/role.directive';
import Swal from 'sweetalert2';

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
                      this.productService.deleteProduct(id).subscribe(() => {
                   
                        this.products = this.products.filter(p => p.id !== id); 
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
 
}

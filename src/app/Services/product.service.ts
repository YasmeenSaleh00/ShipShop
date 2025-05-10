import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/Product';

import { AuthService } from './auth.service';
import { AddProduct } from '../Interfaces/AddProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  Url:string="https://localhost:7057/api/Product";
  constructor(private http:HttpClient,private authService:AuthService) { }
  private getHeaders() {
    return { headers: { Authorization: `Bearer ${this.authService.getToken()}` } };
  }
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.Url);
  }
  getProductsCount():Observable<number>{
    return this.http.get<number>(`${this.Url}/count`);
  }
  
    getProductById(id:number):Observable<Product>{
      return this.http.get<Product>(this.Url + `/${id}`);
    }
    addProduct(product:AddProduct){
      return this.http.post<AddProduct>(this.Url,product,this.getHeaders());
    }
  
    updateProduct(id:number,product:AddProduct){
      return this.http.put<Product>(this.Url+`/${id}`,product,this.getHeaders());
    }
  
    deleteProduct(id:number){
        return this.http.delete(this.Url+`/${id}`,this.getHeaders());
    }
    sortByCreationDate(sortDirection:string){
    return this.http.get<Product[]>(`${this.Url}/sort-by-creation-date/${sortDirection}`,this.getHeaders())
    }
    sortByName(sortDirection:string){
      return this.http.get<Product[]>(`${this.Url}/sort-by-name/${sortDirection}`,this.getHeaders())
    }
    
    sortByPrice(sortDirection:string){
      return this.http.get<Product[]>(`${this.Url}/sort-by-price/${sortDirection}`,this.getHeaders())
    }
    sortById(sortDirection:string){
      return this.http.get<Product[]>(`${this.Url}/sort-by-id/${sortDirection}`,this.getHeaders())
    
    }
    getProductByCategory(categoryName:string):Observable<Product[]>{
      
      return this.http.get<Product[]>(`${this.Url}/GetByFilters/${categoryName}`,this.getHeaders())
    }

    getProductByBrandName(brandName:string):Observable<Product[]>{
      
      return this.http.get<Product[]>(`${this.Url}/GetByBrand/${brandName}`,this.getHeaders())
    }
    searchProducts(name: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.Url}/search/${name}`);
    }
    
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/Product';

import { AuthService } from './auth.service';


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
    addProduct(product:Product){
      return this.http.post<Product>(this.Url,product,this.getHeaders());
    }
  
    updateProduct(id:number,product:Product){
      return this.http.put<Product>(this.Url+`/${id}`,product,this.getHeaders());
    }
  
    deleteProduct(id:number){
        return this.http.delete(this.Url+`/${id}`,this.getHeaders());
    }
    sortByCreationDate(sortDirection:string){
    return this.http.get<Product[]>(`${this.Url}/sort-by-creation-date/${sortDirection}`)
    }
    sortByName(sortDirection:string){
      return this.http.get<Product[]>(`${this.Url}/sort-by-name/${sortDirection}`)
    }
    
    sortByPrice(sortDirection:string){
      return this.http.get<Product[]>(`${this.Url}/sort-by-price/${sortDirection}`)
    }
    sortById(sortDirection:string){
      return this.http.get<Product[]>(`${this.Url}/sort-by-id/${sortDirection}`)
    
    }
    getProductByCategory(categoryName:string):Observable<Product[]>{
      
      return this.http.get<Product[]>(`${this.Url}/GetByFilters/${categoryName}`)
    }

    getProductByBrandName(brandName:string):Observable<Product[]>{
      
      return this.http.get<Product[]>(`${this.Url}/GetByBrand/${brandName}`)
    }
    searchProducts(name: string): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.Url}/search/${name}`);
    }
    
}


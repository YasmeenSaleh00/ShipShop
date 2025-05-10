import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../Interfaces/Category';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  Url:string="https://localhost:7057/api/Category"
  constructor(private http:HttpClient,private authService:AuthService) { }

  private getHeaders() {
    return { headers: { Authorization: `Bearer ${this.authService.getToken()}` } };
  }

  getCategories():Observable<Category[]>{
   return this.http.get<Category[]>(this.Url );
  }
  getCategoryCount():Observable<number>{
    return this.http.get<number>(`${this.Url}/count`);
  }
  getCategoryById(id:number){
    return this.http.get<Category>(this.Url + `/${id}`,this.getHeaders());
  }
  addCategory(category:Category){
    return this.http.post<Category>(this.Url,category,this.getHeaders());
  }

  updateCategory(id:number,category:Category){

    return this.http.put<Category>(this.Url+`/${id}`,category,this.getHeaders());
  }

  deleteCategory(id:number){
      return this.http.delete(this.Url+`/${id}`,this.getHeaders());
  }
  sortByCreationDate(sortDirection:string){
  return this.http.get<Category[]>(`${this.Url}/sort-by-creation-date/${sortDirection}`)
  }
  sortByName(sortDirection:string){
    return this.http.get<Category[]>(`${this.Url}/sort-by-name/${sortDirection}`)
  }
 
  sortById(sortDirection:string){
    return this.http.get<Category[]>(`${this.Url}/sort-by-id/${sortDirection}`)
  
  }
}

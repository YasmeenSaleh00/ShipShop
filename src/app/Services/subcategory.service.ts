import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { SubCategory } from '../Interfaces/SubCategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

 Url:string="https://localhost:7057/api/SubCategory"
   constructor(private http:HttpClient,private authService:AuthService) { }
 
   private getHeaders() {
     return { headers: { Authorization: `Bearer ${this.authService.getToken()}` } };
   }
 
   getSubCategories():Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(this.Url );
   }
   getSubCategoriesCount():Observable<number>{
    return this.http.get<number>(`${this.Url}/count`);
  }
   getSubCategoryById(id:number){
     return this.http.get<SubCategory>(this.Url + `/${id}`,this.getHeaders());
   }
   getSubCategoriesByCategoryId(categoryId:number){
    return this.http.get<SubCategory[]>(`${this.Url}/get-by-filter/${categoryId}`)
  
  }
   addSubCategory(category:SubCategory){
     return this.http.post<SubCategory>(this.Url,category,this.getHeaders());
   }
 
   updateSubCategory(id:number,category:SubCategory){
     return this.http.put<SubCategory>(this.Url+`/${id}`,category,this.getHeaders());
   }
 
   deleteSubCategory(id:number){
       return this.http.delete(this.Url+`/${id}`,this.getHeaders());
   }
   sortByCreationDate(sortDirection:string){
   return this.http.get<SubCategory[]>(`${this.Url}/sort-by-creation-date/${sortDirection}`)
   }
   sortByName(sortDirection:string){
     return this.http.get<SubCategory[]>(`${this.Url}/sort-by-name/${sortDirection}`)
   }
  
   sortById(sortDirection:string){
     return this.http.get<SubCategory[]>(`${this.Url}/sort-by-id/${sortDirection}`)
   
   }
}

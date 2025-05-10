import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../Interfaces/Brand';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  Url:string="https://localhost:7057/api/Brand"
  constructor(private http:HttpClient,private authService:AuthService) 
  {}
  private getHeaders() {
    return { headers: { Authorization: `Bearer ${this.authService.getToken()}` } };
  }
  getBrands():Observable<Brand[]>{

    return this.http.get<Brand[]>(this.Url);
  }
  getBrandCount():Observable<number>{
    return this.http.get<number>(`${this.Url}/count`);
  }
  getBrandById(id:number){
    return this.http.get<Brand>(this.Url+`/${id}`,this.getHeaders());
  }

  addBrand(brand:Brand){
    return this.http.post<Brand>(this.Url,brand,this.getHeaders());
  }

  updateBrand(id:number, brand:Brand){
    return this.http.put<Brand>(this.Url+`/${id}`,brand,this.getHeaders());
  }

  deleteBrand(id:number){
    return this.http.delete(this.Url+`/${id}`,this.getHeaders());
  }
  sortByCreationDate(sortDirection:string){
  return this.http.get<Brand[]>(`${this.Url}/sort-by-creation-date/${sortDirection}`)
  }
  sortByName(sortDirection:string){
    return this.http.get<Brand[]>(`${this.Url}/sort-by-name/${sortDirection}`)
  }
  

  sortById(sortDirection:string){
    return this.http.get<Brand[]>(`${this.Url}/sort-by-id/${sortDirection}`)
  
  }
}

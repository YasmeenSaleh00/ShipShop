import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishList } from '../Interfaces/WishList';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient , private authService:AuthService) { }

  Url:string="https://localhost:7057/api/WishList";
  private getHeaders() {
    return { headers: { Authorization: `Bearer ${this.authService.getToken()}` } };
  }
  getWishListById(id: number): Observable<WishList> {
      return this.http.get<WishList>(`${this.Url}/${id}`,this.getHeaders());
    }
    removeFromeWishList(wishId:number,productId:number){
      return this.http.delete(`${this.Url}/${wishId}/${productId}`,this.getHeaders());
    }
    getWishListByCustomerId(customerId:number){
      return this.http.get<WishList>(`${this.Url}/get-by-customer/${customerId}`);
    }
    
  addToWishList( body: { customerId: number; productId: number }): Observable<any> {
    return this.http.post(`${this.Url}`, body, this.getHeaders());
  }
}

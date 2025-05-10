import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModel } from '../Interfaces/CartModel';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
Url:string="https://localhost:7057/api/Cart";
  constructor(private http:HttpClient,private authService:AuthService,private tokenService:TokenService) { }

 private getHeaders() {
  return { headers: { Authorization: `Bearer ${this.authService.getToken()}` } };
}
  getCartById(id: number): Observable<CartModel> {
    return this.http.get<CartModel>(`${this.Url}/${id}`,this.getHeaders());
  }
 removeFromCart(cartId: number,productId:number) {
    return this.http.delete(`${this.Url}/${cartId}/${productId}`,this.getHeaders());
  }

  addToCart( body: { customerId: number; productId: number; quantity: number}): Observable<any> {
    return this.http.post(`${this.Url}`, body, this.getHeaders());
  }
  
  getCartByCustomerId(customerId: number): Observable<CartModel> {
    return this.http.get<CartModel>(`${this.Url}/get-by-customer/${customerId}`, this.getHeaders());
  }
  updateCartItemQuantity(body: { customerId: number; productId: number; quantity: number}): Observable<any> {
    return this.http.put(`${this.Url}/UpdateQuantity`, body, this.getHeaders());
  }
  

}

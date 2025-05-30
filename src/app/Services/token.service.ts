import { Injectable } from '@angular/core';
import { MyToken } from '../Interfaces/MyToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor() { }

  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private decodeToken(): MyToken | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload) as MyToken;
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  getUserId(): number  {
    const myToken = this.decodeToken();
    return myToken ? +myToken.nameid : 0;  
  }

  getCartId(): number  {
    const myToken = this.decodeToken();
    return myToken ? +myToken.CartId : 0;  
  }
  getWishlistId() :number {
    const myToken = this.decodeToken();
    return myToken ? +myToken.WishlistId : 0;  
   }
  getRole(): string | null {
    const myToken = this.decodeToken();
    return myToken ? myToken.role : null;    
  }

}

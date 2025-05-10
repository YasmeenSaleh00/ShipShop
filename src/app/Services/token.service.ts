import { Injectable } from '@angular/core';
import { MyToken } from '../Interfaces/MyToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  getWishlistId() :number {
    const decoded = this.decodeToken();
    return decoded ? +decoded.WishlistId : 0;   }

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
    const decoded = this.decodeToken();
    return decoded ? +decoded.nameid : 0;  
  }

  getCartId(): number  {
    const decoded = this.decodeToken();
    return decoded ? +decoded.CartId : 0;  
  }

  getRole(): string | null {
    const decoded = this.decodeToken();
    return decoded ? decoded.role : null;    
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY='auth_token';
  private readonly ROLES_KEY='user_role'
  url:string="https://localhost:7057/api/Auth";
  constructor(private http:HttpClient ) { }

  login(email:string,password:string):Observable<any>{
 return this.http.post(this.url,{email,password});
  }

  getToken(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLES_KEY)
  }
}
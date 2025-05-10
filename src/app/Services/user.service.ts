import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/User';
import { AddUser } from '../Interfaces/AddUser';
import { updateUserPassword } from '../Interfaces/UpdateUserPassword';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  Url:string="https://localhost:7057/api/User";
  private getHeaders() {
    return { headers: { Authorization: `Bearer ${this.authService.getToken()}` } };
  }
  getUsers(): Observable<any> {
return this.http.get<User[]>(this.Url,this.getHeaders());}

getUsersCount():Observable<number>{
  return this.http.get<number>(`${this.Url}/count`);
}
 getUserById(id:number){
     return this.http.get<User>(this.Url + `/${id}`,this.getHeaders());
 
}
  addUser(user:AddUser){
      return this.http.post<AddUser>(this.Url,user,this.getHeaders());
  }

  updateUserPassword(id:number,user:updateUserPassword){
        return this.http.put<updateUserPassword>(this.Url+`/${id}`,user,this.getHeaders());
    
  }
  deleteUser(id:number){
    return this.http.delete(this.Url+`/${id}`,this.getHeaders());
}
sortByCreationDate(sortDirection:string){
return this.http.get<User[]>(`${this.Url}/sort-by-creation date/${sortDirection}`,this.getHeaders())
}
sortByName(sortDirection:string){
  return this.http.get<User[]>(`${this.Url}/sort-by-Name/${sortDirection}`,this.getHeaders())
}

sortByEmail(sortDirection:string){
  return this.http.get<User[]>(`${this.Url}/sort-by-Email/${sortDirection}`,this.getHeaders())
}
sortById(sortDirection:string){
  return this.http.get<User[]>(`${this.Url}/sort-by-Id/${sortDirection}`,this.getHeaders())

}
}

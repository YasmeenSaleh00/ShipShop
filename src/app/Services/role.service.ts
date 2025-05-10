import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../Interfaces/Role';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url:string="https://localhost:7057/api/Role";
  constructor(private http:HttpClient,private authService:AuthService) { }
  private getHeaders() {
    return { headers: { Authorization: `Bearer ${this.authService.getToken()}` } };
  }
  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.url);
  }

 getRoleById(id:number){
     return this.http.get<Role>(this.url + `/${id}`);
 
}
  addRole(role:Role){
      return this.http.post<Role>(this.url,role,this.getHeaders());
  }

  updateRole(id:number,role:Role){
        return this.http.put<Role>(this.url+`/${id}`,role,this.getHeaders());
    
  }
  deleteRole(id:number){
    return this.http.delete(this.url+`/${id}`,this.getHeaders());
}
sortByCreationDate(sortDirection:string){
return this.http.get<Role[]>(`${this.url}/sort-by-creation date/${sortDirection}`)
}
sortByName(sortDirection:string){
  return this.http.get<Role[]>(`${this.url}/sort-by-Name/${sortDirection}`)
}

sortByEmail(sortDirection:string){
  return this.http.get<Role[]>(`${this.url}/sort-by-Email/${sortDirection}`)
}
sortById(sortDirection:string){
  return this.http.get<Role[]>(`${this.url}/sort-by-Id/${sortDirection}`)

}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Interfaces/Customer';
import { AddCustomer } from '../Interfaces/AddCustomer';
import { UpdateCustomer } from '../Interfaces/UpdateCustomer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  Url:string="https://localhost:7057/api/Customer";
  constructor(private http:HttpClient, private authService:AuthService) { }
  private getHeaders() {
    return { headers: { Authorization: `Bearer ${this.authService.getToken()}` } };
  }
  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.Url);
  }
  getCustomerCount():Observable<number>{
    return this.http.get<number>(`${this.Url}/count`);
  }
  getCustomerById(id:number){
    return this.http.get<Customer>(this.Url+`/${id}`);
  }
  updateCustomer(id:number,updateCustomer:UpdateCustomer){
    return this.http.put<UpdateCustomer>(this.Url+`/${id}`,updateCustomer,this.getHeaders());
  }
  banCustomer(id: number) {
    return this.http.put<Customer>(`${this.Url}/BanCustomer/${id}`, {},this.getHeaders());
  }
 activeCustomer(id:number){
  return this.http.put<Customer>(`${this.Url}/ActivateCustomer/${id}`, {},this.getHeaders());

}  
  verifyEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.Url}/verify-email`, { email });
  }

  // تحديث كلمة المرور
  updatePassword(email: string, newPassword: string): Observable<any> {
    return this.http.put<any>(this.Url, { email, newPassword });
  }
singUp(customer:AddCustomer){
  return this.http.post<AddCustomer>(this.Url,customer);
}

sortByCreationDate(sortDirection:string){
return this.http.get<Customer[]>(`${this.Url}/sort-by-creation date/${sortDirection}`)
}
sortByName(sortDirection:string){
  return this.http.get<Customer[]>(`${this.Url}/sort-by-Name/${sortDirection}`)
}

sortByEmail(sortDirection:string){
  return this.http.get<Customer[]>(`${this.Url}/sort-by-Email/${sortDirection}`)
}
sortById(sortDirection:string){
  return this.http.get<Customer[]>(`${this.Url}/sort-by-Id/${sortDirection}`)

}
}

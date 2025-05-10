import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrder } from '../Interfaces/CreateOrder';
import { OrderModel } from '../Interfaces/OrderModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:string="https://localhost:7057/api/Order";
  constructor(private http:HttpClient) { }

  getOrderById(id:number):Observable< OrderModel>{
    return this.http.get<OrderModel>(this.url+`/${id}`);
  }
  createOrder(order:CreateOrder,customerId:number){
    return this.http.post<CreateOrder>(this.url+`/${customerId}`,order)
  }
  getAllOrdersByCustomerId(customerId:number):Observable<OrderModel[]>{
    return this.http.get<OrderModel[]>(`${this.url}/GetAllOrdersByCustomerId/${customerId}`);
  }
  getAllOrders():Observable<OrderModel[] >{
    return this.http.get<OrderModel[]>(this.url);
  }
  getOrderCount():Observable<number>{
    return this.http.get<number>(`${this.url}/count`);
  }
  updateOrderStauts(orderId: number, orderStatusId: number): Observable<any> {
    return this.http.put(`${this.url}/update-status`, { orderId, orderStatusId });
  }


   sortByCreationDate(sortDirection:string){
    return this.http.get<OrderModel[]>(`${this.url}/sort-by-creation-date/${sortDirection}`)
    }
    sortByName(sortDirection:string){
      return this.http.get<OrderModel[]>(`${this.url}/sort-by-customer-name/${sortDirection}`)
    }
    
  
    sortById(sortDirection:string){
      return this.http.get<OrderModel[]>(`${this.url}/sort-by-id/${sortDirection}`)
    
    }

    sortByDeliveryDate(sortDirection:string){
      return this.http.get<OrderModel[]>(`${this.url}/sort-by-delivery-date/${sortDirection}`)
      }
}

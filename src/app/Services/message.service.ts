import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Messages } from '../Interfaces/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  Url:string="https://localhost:7057/api/Messages";

  constructor(private http:HttpClient) { }

  getMessages():Observable<Messages[]>{
      return this.http.get<Messages[]>(this.Url);
    }
  getMessageById(id:number){
        return this.http.get<Messages>(this.Url+`/${id}`);
      }
  CreateMessage(message:Messages){
       return this.http.post<Messages>(this.Url,message);
     } 
}

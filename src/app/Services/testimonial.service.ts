import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Testimonial } from '../Interfaces/Testimonial';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

url:string="https://localhost:7057/api/Testimonial";
  constructor(private http:HttpClient) { }

getTestimonials():Observable<Testimonial[] >{
    return this.http.get<Testimonial[]>(this.url);
  }
  createTestimonial(testimonial:Testimonial){
    return this.http.post<Testimonial>(this.url,testimonial)
  }
  getTestimonialByCustomerId(customerId:number):Observable<Testimonial>{
    return this.http.get<Testimonial>(this.url + `/${customerId}`);
  }
   getNegativeCount():Observable<number>{
    return this.http.get<number>(`${this.url}/count`);
  }
sortByCreationDate(sortDirection:string){
return this.http.get<Testimonial[]>(`${this.url}/sort-by-creation-date/${sortDirection}`)
}
sortById(sortDirection:string){
  return this.http.get<Testimonial[]>(`${this.url}/sort-by-id/${sortDirection}`)

}
sortByRating(sortDirection:string){
  return this.http.get<Testimonial[]>(`${this.url}/sort-by-rating/${sortDirection}`)

}
}

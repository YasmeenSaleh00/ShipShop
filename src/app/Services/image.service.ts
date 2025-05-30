import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url:string="https://localhost:7057/api/Attachment";
  constructor(private http:HttpClient) { }
  
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`${this.url}/UploadImages`, formData, { responseType: 'text' });
  }
  
  

}

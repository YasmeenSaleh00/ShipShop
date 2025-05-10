import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupTypeModel } from '../Interfaces/LookupTypeModel';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
Url:string="https://localhost:7057/api/Lookup"
  constructor(private http:HttpClient) { }


  getLookupItemValuesByType(lookupTypeId: number): Observable<LookupTypeModel[]> {
    return this.http.get<LookupTypeModel[]>(`${this.Url}/GetLookupItemValueByType/${lookupTypeId}`);
  }
  
}

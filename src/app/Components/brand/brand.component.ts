import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../Services/brand.service';
import { Brand } from '../../Interfaces/Brand';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../Directive/role.directive';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [NgFor,RouterLink,NgClass,RoleDirective],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
 
  
  constructor(private brandService:BrandService){}


  ngOnInit(): void {
    this.brandService.getBrands().subscribe(data=>this.brands=data);
  }

  deleteBrand(id:number){
    this.brandService.deleteBrand(id).subscribe(()=>{
      this.brands=this.brands.filter(p=>p.id !== id);
  
    });
  }
  sortByCreationDate(sortDirection:string){
    this.brandService.sortByCreationDate(sortDirection).subscribe(data=>this.brands=data);
    }
    sortByName(sortDirection:string){
      this.brandService.sortByName(sortDirection).subscribe(data=>this.brands=data);
    
    }
   
    sortById(sortDirection:string){
      this.brandService.sortById(sortDirection).subscribe(data=>this.brands=data);
    
    }
}

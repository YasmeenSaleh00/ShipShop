import { Component, OnInit } from '@angular/core';
import { Brand } from '../../Interfaces/Brand';
import { BrandService } from '../../Services/brand.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-page',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './brand-page.component.html',
  styleUrl: './brand-page.component.css'
})
export class BrandPageComponent implements OnInit {
  brand:Brand[]=[];
  constructor(
    private brandService:BrandService
){
    
  }

  ngOnInit(): void {
  
    this.brandService.getBrands().subscribe(data=>this.brand=data);
 
   }
}

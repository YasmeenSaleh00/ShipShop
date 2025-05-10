import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../Interfaces/Category';
import { CategoryService } from '../../Services/category.service';


@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  categories:Category[]=[];
  constructor(
    private categoryService:CategoryService
){
    
  }

  ngOnInit(): void {
  
    this.categoryService.getCategories().subscribe(data=>this.categories=data);
 
   }
}

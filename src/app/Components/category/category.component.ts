import { Component, OnInit } from '@angular/core';
import { Category } from '../../Interfaces/Category';
import { CategoryService } from '../../Services/category.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../Directive/role.directive';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor,RouterLink,RoleDirective],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

category:Category[]=[];

constructor(private categoryService:CategoryService){}
ngOnInit(): void {
  this.categoryService.getCategories().subscribe(data=>this.category=data);
}

deleteCategory(id:number){
  this.categoryService.deleteCategory(id).subscribe(()=>{
    this.category=this.category.filter(p=>p.id !== id);

  });
}
sortByCreationDate(sortDirection:string){
  this.categoryService.sortByCreationDate(sortDirection).subscribe(data=>this.category=data);
  }
  sortByName(sortDirection:string){
    this.categoryService.sortByName(sortDirection).subscribe(data=>this.category=data);
  
  }
 
  sortById(sortDirection:string){
    this.categoryService.sortById(sortDirection).subscribe(data=>this.category=data);
  
  }
}

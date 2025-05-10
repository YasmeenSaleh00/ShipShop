import { Component } from '@angular/core';
import { RoleDirective } from '../../Directive/role.directive';
import { NgFor } from '@angular/common';
import { SubCategory } from '../../Interfaces/SubCategory';
import { SubcategoryService } from '../../Services/subcategory.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subcategory-table',
  standalone: true,
  imports: [RoleDirective,NgFor,RouterLink],
  templateUrl: './subcategory-table.component.html',
  styleUrl: './subcategory-table.component.css'
})
export class SubcategoryTableComponent {
category:SubCategory[]=[];

constructor(private subCategoryService:SubcategoryService){}
ngOnInit(): void {
  this.subCategoryService.getSubCategories().subscribe(data=>this.category=data);
}

deleteSubCategory(id:number){
  this.subCategoryService.deleteSubCategory(id).subscribe(()=>{
    this.category=this.category.filter(p=>p.id !== id);

  });
}
sortByCreationDate(sortDirection:string){
  this.subCategoryService.sortByCreationDate(sortDirection).subscribe(data=>this.category=data);
  }
  sortByName(sortDirection:string){
    this.subCategoryService.sortByName(sortDirection).subscribe(data=>this.category=data);
  
  }
 
  sortById(sortDirection:string){
    this.subCategoryService.sortById(sortDirection).subscribe(data=>this.category=data);
  
  }
}

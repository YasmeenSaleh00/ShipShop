import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubcategoryService } from '../../Services/subcategory.service';
import { SubCategory } from '../../Interfaces/SubCategory';

@Component({
  selector: 'app-subcategory-page',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './subcategory-page.component.html',
  styleUrl: './subcategory-page.component.css'
})
export class SubcategoryPageComponent implements OnInit{
  subCategories:SubCategory[]=[]
constructor(private subCategoryService:SubcategoryService, private route: ActivatedRoute){}
ngOnInit(): void {
  const categoryId = this.route.snapshot.paramMap.get('id');
  if (categoryId) {
    this.subCategoryService.getSubCategoriesByCategoryId(+categoryId).subscribe((data) => {
      this.subCategories = data;
    });
  }
}
}

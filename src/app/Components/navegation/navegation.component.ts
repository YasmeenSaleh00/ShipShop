import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TokenService } from '../../Services/token.service';

import { RoleDirective } from '../../Directive/role.directive';
import { NgFor } from '@angular/common';
import { SubcategoryService } from '../../Services/subcategory.service';
import { SubCategory } from '../../Interfaces/SubCategory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [RouterLink,RoleDirective,NgFor,FormsModule],
  templateUrl: './navegation.component.html',
  styleUrl: './navegation.component.css'
})
export class NavegationComponent {
  userRole: string | null= '';
  searchKeyword:string=''
  constructor(private tokenService: TokenService,private subcatrgoryService:SubcategoryService,private router:Router) {}
  categories:SubCategory[]=[]
  ngOnInit() {
    this.userRole = this.tokenService.getRole();
    this.subcatrgoryService.getSubCategories().subscribe(data=>this.categories=data)

  }
  onSearch() {
    if (this.searchKeyword) {
      this.router.navigate(['/product-card'], { queryParams: { keyword: this.searchKeyword } });
      this.searchKeyword = ''; 
    }
  }
 


}

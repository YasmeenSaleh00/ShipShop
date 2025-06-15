import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { TokenService } from '../../Services/token.service';

import { RoleDirective } from '../../Directive/role.directive';
import { NgFor, NgIf } from '@angular/common';
import { SubcategoryService } from '../../Services/subcategory.service';
import { SubCategory } from '../../Interfaces/SubCategory';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navegation',
  standalone: true,
  imports: [RouterLink,RoleDirective,NgFor,FormsModule,NgIf],
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
  showPopup = false;

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
   @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
  
    if (!target.closest('a') && !target.closest('.popup')) {
      this.showPopup = false;
    }
  }


}

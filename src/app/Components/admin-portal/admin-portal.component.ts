import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CategoryComponent } from "../category/category.component";
import { ProductTableComponent } from "../product-table/product-table.component";

@Component({
  selector: 'app-admin-portal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-portal.component.html',
  styleUrl: './admin-portal.component.css'
})
export class AdminPortalComponent {

constructor(private authService:AuthService,private router:Router){}
logOut(){
  this.authService.logOut();
  this.router.navigate(['/login']);
}
}

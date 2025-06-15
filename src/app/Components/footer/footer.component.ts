import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoleDirective } from '../../Directive/role.directive';
import { NgClass } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink,RoleDirective,NgClass],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
isInfoOpen = false;
isCustomerOpen = false;
constructor(private authService:AuthService,private router:Router){}

logout(){
  this.authService.logOut();
  this.router.navigate(['/login']);
}
}

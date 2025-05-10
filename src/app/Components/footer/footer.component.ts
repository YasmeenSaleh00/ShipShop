import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '../../Directive/role.directive';
import { NgClass } from '@angular/common';

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

}

import { Directive, ElementRef, Input, input, OnInit } from '@angular/core';
import { TokenService } from '../Services/token.service';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective implements OnInit {

  constructor(private elementRef:ElementRef,private tokenService:TokenService) { }
 
  @Input() appRole: string[] = [];

ngOnInit(): void {
  const userRole = this.tokenService.getRole();

  if (!userRole || !this.appRole || this.appRole.length === 0) {
    this.elementRef.nativeElement.remove();
    return;
  }

  const isAuthorized = this.appRole.includes(userRole);

  if (!isAuthorized) {
    this.elementRef.nativeElement.remove();
  }
}

  }


import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('auth_token', response.accessToken);
        const role = this.tokenService.getRole();
        if (role) {
          localStorage.setItem('user_role', role);
        }
        if(role != 'Customer')
        this.router.navigate(['/admin']);
      else{
        this.router.navigate(['/home'])
      }
      },
      error: () => {
        this.errorMessage = 'Invalid Email Or Password';
      }
    });
  }
}

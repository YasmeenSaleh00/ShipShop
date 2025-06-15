import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../Services/token.service';
import Swal from 'sweetalert2';

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

      if (role != 'Customer') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    },
    error: (err) => {
      let message = 'Invalid Email or Password';
      if (err.error && err.error.message) {
        message = err.error.message;
      }

      Swal.fire({
        title: 'Login Failed',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'rgb(252, 148, 183)'
      });
    }
  });
}
}

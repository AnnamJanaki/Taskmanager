import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: User = { email: '', password: '' };
  loginError: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  onLogin() {
    this.loginService.login(this.loginData).subscribe(
      (response: User) => {
        this.loginData = response;
        this.loginError = '';
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['task-manager']);
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }

  onSignUp() {
    this.router.navigate(['signup']);
  }
}

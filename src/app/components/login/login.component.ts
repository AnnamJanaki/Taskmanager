import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  loginError: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post('http://localhost:8087/login', this.loginData).subscribe(
      (response: any) => {
        
        console.log('Login successful');
        this.loginData = { email: '', password: '' };
        this.loginError = '';
        const userId = response.userId;
        this.getRedirectUrl(userId);
      },
      (error) => {
        
        console.error('Error during login:', error);
        this.loginError = 'Invalid email or password. Please try again.';
      }
    ); 
  }

  getRedirectUrl(userId: string) {
    const redirectUrl = `http://localhost:8087/redirect-url/${userId}`;
    this.http.get(redirectUrl, { responseType: 'text' }).subscribe(
      (response: any) => {
        this.router.navigateByUrl(response);
      },
      (error) => {
        console.error('Error getting redirect URL:', error);
      }
    );
  } 
  
}

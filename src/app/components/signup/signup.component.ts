import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls:['./signup.component.css']
})
export class SignupComponent {
  signupData = { username: '', email: '', password: '', confirmPassword: '' };

  constructor(private http: HttpClient, private router: Router) {}


  signup() {
    this.http.post('http://localhost:8087/signup', this.signupData)
      .subscribe(response => {
        // Handle successful signup
        console.log('Signup successful');
        this.router.navigate(['/login']);

      }, error => {
        // Handle error
        console.error('Signup failed:', error);
      });
  }



  onLogin() {
    this.router.navigate(['login']);
  }
}

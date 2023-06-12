import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(params: User): Observable<any> {
    return this.http.post('http://localhost:8087/login', params);
  }
}

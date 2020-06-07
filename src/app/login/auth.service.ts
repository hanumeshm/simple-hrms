import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ message: string; token: string }>(BACKEND_URL + 'login', authData)
      .subscribe(response => {
        if (response.message != 'Auth failed') {
          localStorage.setItem('simpleHRMS', response.token);
          this.router.navigate(['/home']);
        }
      });
  }

  loggedIn() {
    return !!localStorage.getItem('simpleHRMS');
  }

  getToken() {
    return localStorage.getItem('simpleHRMS');
  }

  logout() {
    localStorage.removeItem('simpleHRMS');
    this.router.navigate(['/login']);
  }
}

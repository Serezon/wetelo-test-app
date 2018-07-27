import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private router: Router) {
  }

  getEmail(): any {
    return localStorage.getItem('email');
  }

  logout(): any {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

  getToken(): any {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];

// // src/app/services/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/api/auth';
//   private tokenKey = 'token';

//   constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

//   register(user: any) {
//     return this.http.post(`${this.apiUrl}/register`, user);
//   }

//   login(credentials: any) {
//     return this.http.post(`${this.apiUrl}/login`, credentials)
//       .subscribe((response: any) => {
//         localStorage.setItem(this.tokenKey, response.token);
//         this.router.navigate(['/']);
//       });
//   }

//   logout() {
//     localStorage.removeItem(this.tokenKey);
//     this.router.navigate(['/login']);
//   }

//   isLoggedIn() {
//     const token = localStorage.getItem(this.tokenKey);
//     return token && !this.jwtHelper.isTokenExpired(token);
//   }

//   getToken() {
//     return localStorage.getItem(this.tokenKey);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .subscribe((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.router.navigate(['/home']);
      });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    const token = localStorage.getItem(this.tokenKey);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}

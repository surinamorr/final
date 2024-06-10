import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private api_url = environment.api_url + '/api/v1/auth'; 
  private tokenKey = 'authToken';

  public authToken?: string;
  public currentUser?: any;


  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) {}

  private _saveToStorage(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  saveAuthToken(): void {
    this._saveToStorage(this.tokenKey, this.authToken)
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null{
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null
  }

  getProfileInformation(): Observable<any> {
    return this.http.get<any>(this.api_url + '/my-profile')
     .pipe(
        map(res => {
          return res;
        })
      );
  }

  getCurrentUser(cb? : () => void){
    this.getProfileInformation().subscribe((res) => {
      if(res['status'] === 'success') {
        this.currentUser = res['data']!['user'];
        if(cb) {
          cb();
        }
      }
    });
  }

  login(data: any) : Observable<any> {
    return this.http.post<any>(this.api_url + '/login', data)
      .pipe(
        map((res) => {
          return res;
        })
      )
  }

  register(data: any) : Observable<any> {
    return this.http.post<any>(this.api_url + '/register', data)
     .pipe(
        map((res) => {
          return res;
        })
      )
  }

  getUserRole() {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role; // Assuming the token contains a 'role' field
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

}//END OF AUTH SERVICE

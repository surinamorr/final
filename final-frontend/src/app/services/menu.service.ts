import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:3000/api/menu'; // Adjust the URL as per your backend setup

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Fetch all menu items
  getMenuItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<any[]>('getMenuItems', []))
      );
  }

  // Add a new menu item
  addMenuItem(menuItem: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, menuItem, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addMenuItem'))
      );
  }

  // Handle HTTP operation that failed
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

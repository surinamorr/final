import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}/menu`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<any[]>('getMenuItems', []))
      );
  }

  addMenuItem(menuItem: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, menuItem, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addMenuItem'))
      );
  }

  deleteMenuItem(type: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/${type}/${id}`;
    return this.http.delete<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteMenuItem'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

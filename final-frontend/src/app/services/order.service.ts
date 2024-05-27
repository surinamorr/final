import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders'; // Adjust the URL as per your backend setup

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Fetch all orders
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<any[]>('getOrders', []))
      );
  }

  // Fetch a single order by ID
  getOrderById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any>(`getOrderById id=${id}`))
      );
  }

  // Add a new order
  addOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addOrder'))
      );
  }

  // Update an existing order
  updateOrder(id: number, order: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, order, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateOrder'))
      );
  }

  // Delete an order
  deleteOrder(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteOrder'))
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

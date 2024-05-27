import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/api/customers'; // Adjust the URL as per your backend setup

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Fetch all customers
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<any[]>('getCustomers', []))
      );
  }

  // Fetch a single customer by ID
  getCustomerById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any>(`getCustomerById id=${id}`))
      );
  }

  // Add a new customer
  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addCustomer'))
      );
  }

  // Update an existing customer
  updateCustomer(id: number, customer: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, customer, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateCustomer'))
      );
  }

  // Delete a customer
  deleteCustomer(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteCustomer'))
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private API_URL = environment.api_url + '/api/v1/customers';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<any> {
    return this.http.get<any[]>(this.API_URL + '/all-customers')
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getSingleCustomer(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '/single-customer/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  createCustomer(data: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/create-customer', data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateCustomer(id: number, data: any): Observable<any> {
    return this.http.patch<any>(this.API_URL + '/update-customer/' + id, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(this.API_URL + '/delete-customer/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

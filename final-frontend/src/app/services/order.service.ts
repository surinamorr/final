import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private api_url = environment.api_url + '/api/v1/orders';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Fetch all orders
  getAllOrders(): Observable<any> {
    return this.http.get<any[]>(this.api_url + '/all-orders')
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

    // Fetch all order Details
    getAllOrderDetails(): Observable<any> {
      return this.http.get<any[]>(this.api_url + '/all-order-details')
        .pipe(
          map((res) => {
            return res;
          })
        );
    }

  // Fetch a single Details order by ID
  getSingleOrderDetails(id: number): Observable<any> {
    return this.http.get<any[]>(this.api_url + '/single-order-details/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  // Fetch a single order by ID
  getSingleOrder(id: number): Observable<any> {
    return this.http.get<any>(this.api_url + '/single-order/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

    // Fetch all Logged In customer Orders
    getAllUserOrders(): Observable<any> {
      return this.http.get<any[]>(this.api_url + '/all-customer-orders')
        .pipe(
          map((res) => {
            return res;
          })
        );
    }

  // Fetch a single order by ID
  getSingleUserOrders(id: number): Observable<any> {
    return this.http.get<any>(this.api_url + '/single-customer-order/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  // Add a new order
  createOrder(data: any): Observable<any> {
    return this.http.post<any>(this.api_url + '/create-order', data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  // Update an existing order
  updateOrder(id: number, data: any): Observable<any> {
    return this.http.patch<any>(this.api_url + '/update-order/' + id, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  // Delete an order
  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(this.api_url + '/delete-order/' + id)
      .pipe(
        map((res) => {
          return res;
        })
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

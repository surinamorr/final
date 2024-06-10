import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private api_url = environment.api_url + '/api/v1/menu';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getAllStarters(): Observable<any> {
    return this.http.get<any[]>(this.api_url + '/all-starters')
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllMains(): Observable<any> {
    return this.http.get<any[]>(this.api_url + '/all-mains')
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllDesserts(): Observable<any> {
    return this.http.get<any[]>(this.api_url + '/all-desserts')
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getAllSides(): Observable<any> {
    return this.http.get<any[]>(this.api_url + '/all-sides')
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getSingleStarter(id: number): Observable<any> {
    return this.http.get<any>(this.api_url + '/single-starter/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getSingleMain(id: number): Observable<any> {
    return this.http.get<any>(this.api_url + '/single-main/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getSingleDessert(id: number): Observable<any> {
    return this.http.get<any>(this.api_url + '/single-dessert/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getSingleSide(id: number): Observable<any> {
    return this.http.get<any>(this.api_url + '/single-side/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addStarter(data: any): Observable<any> {
    return this.http.post<any>(this.api_url + '/add-starter', data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addMain(data: any): Observable<any> {
    return this.http.post<any>(this.api_url + '/add-main', data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addDessert(data: any): Observable<any> {
    return this.http.post<any>(this.api_url + '/add-dessert', data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  addSide(data: any): Observable<any> {
    return this.http.post<any>(this.api_url + '/add-side', data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateStarter(id: number, data: any): Observable<any> {
    return this.http.patch<any>(this.api_url + '/update-starter/' + id, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateMain(id: number, data: any): Observable<any> {
    return this.http.patch<any>(this.api_url + '/update-main/' + id, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateDessert(id: number, data: any): Observable<any> {
    return this.http.patch<any>(this.api_url + '/update-dessert/' + id, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  updateSide(id: number, data: any): Observable<any> {
    return this.http.patch<any>(this.api_url + '/update-side/' + id, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteStarter(id: number): Observable<any> {
    return this.http.delete<any>(this.api_url + '/delete-starter/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteMain(id: number): Observable<any> {
    return this.http.delete<any>(this.api_url + '/delete-main/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteDessert(id: number): Observable<any> {
    return this.http.delete<any>(this.api_url + '/delete-dessert/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteSide(id: number): Observable<any> {
    return this.http.delete<any>(this.api_url + '/delete-side/' + id)
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

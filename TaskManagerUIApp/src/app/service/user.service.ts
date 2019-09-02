import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Iuser } from 'src/app/taskmodel/Iuser';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:56858/api/users';


  constructor(private http: HttpClient) { }


  getUserDetails(): Observable<Iuser[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.get<Iuser[]>(this.url, httpOptions);
  }
  getUserBySearch(searchString: string): Observable<Iuser[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.get<Iuser[]>(this.url + '?searchString=' + searchString, httpOptions);
  }

  addUserDetails(user: Iuser): Observable<Iuser> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.post<Iuser>(this.url, user, httpOptions);
  }

  deleteUserDetails(userID: number): Observable<Iuser> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.delete<Iuser>(this.url + '?id=' + userID, httpOptions);
  }

  updateUserDetails(user: Iuser): Observable<Iuser> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.put<Iuser>(this.url, user, httpOptions);
  }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

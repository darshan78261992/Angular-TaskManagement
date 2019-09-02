import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Itask } from 'src/app/taskmodel/Itask';
import { IparentTask } from '../taskmodel/IparentTask';


@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  private url = 'http://localhost:56858/api/Task/';


  constructor(private http: HttpClient) { }


  getTaskManagerDetails(): Observable<Itask[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.get<Itask[]>(this.url, httpOptions);
  }
  getTaskDetailsByProjectId(projectId): Observable<Itask[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.get<Itask[]>(this.url+ "?projectId=" + projectId, httpOptions);
  }
  getTaskManagerDetailsById(taskId: number): Observable<Itask> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.get<Itask>(this.url + "?taskId=" + taskId, httpOptions);
  }
  getParentTaskDetails(isParent: boolean): Observable<IparentTask[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.get<IparentTask[]>(this.url + "?isParent=" + isParent, httpOptions);
  }

  addTaskManagerDetails(task: Itask): Observable<Itask> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.post<Itask>(this.url, task, httpOptions);
  }

  deleteTaskManagerDetails(taskID: number): Observable<Itask> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.delete<Itask>(this.url + '?id=' + taskID, httpOptions);
  }

  updateTaskManagerDetails(task: Itask): Observable<Itask> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.put<Itask>(this.url, task, httpOptions);
  }
  updateTaskEnd(taskId): Observable<Itask> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE' }) };
    return this.http.put<Itask>(this.url+ '?taskId=' + taskId, taskId, httpOptions);
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

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, Observable, of } from 'rxjs';
import { AuthenticationService } from '../security/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private rootUrlUser = 'http://localhost:8080/authentication';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(this.rootUrlUser, this.httpOptions).pipe(
      tap((_) => console.log('fetched allUsers')),
      catchError(this.handleError<any>('getAllUsers', []))
    );
  }

  editUserInformation(user: User) {
    let url = `${this.rootUrlUser}/update/${user}`;
    /* return this.http.put<User>().pipe(
      tap((_) => console.log('fetched allUsers')),
      catchError(this.handleError<any>('getAllUsers', []))
    ); */
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}

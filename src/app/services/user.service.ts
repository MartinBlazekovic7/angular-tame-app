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
  private rootUrlRegistration = 'http://localhost:8080/registration';

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

  registerUser(user: User) {
    return this.http
      .post<User>(this.rootUrlRegistration, user, this.httpOptions)
      .pipe(
        tap((_) => console.log('register user')),
        catchError(this.handleError<any>('registerUser', []))
      );
  }

  editUserInformation(user: User) {
    let url = `${this.rootUrlUser}/update/${user.username}`;
    return this.http.put<User>(url, user).pipe(
      tap((_) => console.log(`edited user=${user.username}`)),
      catchError(this.handleError<User>('editUserInformation'))
    );
  }
  deleteUser(username: string) {
    const url = `${this.rootUrlUser}/${username}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted user=${username}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}

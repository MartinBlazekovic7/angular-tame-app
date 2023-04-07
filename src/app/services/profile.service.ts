import { AuthenticationService } from 'src/app/security/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private rootUrlUser = 'http://localhost:8080/authentication/';
  private rootUrlPost = 'http://localhost:8080/post/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  getUserDetails(): Observable<User> {
    let username = this.authService.getAuthenticatedUserUsername();
    return this.http
      .get<User>(this.rootUrlUser + username, this.httpOptions)
      .pipe(
        tap((_) => console.log('fetched userdetails')),
        catchError(this.handleError<any>('getUserDetails', []))
      );
  }
  getUserPosts(): Observable<Post[]> {
    let username = this.authService.getAuthenticatedUserUsername();
    return this.http
      .get<Post[]>(this.rootUrlPost + 'maker=' + username, this.httpOptions)
      .pipe(
        tap((_) => console.log('fetched userPosts')),
        catchError(this.handleError<any>('getUserPosts', []))
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private rootUrlPost = 'http://localhost:8080/post/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getUserFollowsPosts(username: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.rootUrlPost + 'user=' + username, this.httpOptions)
      .pipe(
        tap((_) => console.log('fetched userFollowsPosts')),
        catchError(this.handleError<any>('getUserFollowsPosts', []))
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

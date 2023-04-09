import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  rootUrl = 'http://localhost:8080/comment';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getPostComments(id: number) {
    const url = `${this.rootUrl}/${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      tap((_) => console.log(`get comments of a post=${id}`)),
      catchError(this.handleError<any>('getPostgetPostCommentsLikes'))
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

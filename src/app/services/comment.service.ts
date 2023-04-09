import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  rootUrl = 'http://localhost:8080/comment';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAllComments() {
    return this.http.get(this.rootUrl, this.httpOptions).pipe(
      tap((_) => console.log(`get all comments`)),
      catchError(this.handleError<any>('getAllComments'))
    );
  }

  addNewComment(comment: Comment) {
    return this.http.post(this.rootUrl, comment, this.httpOptions).pipe(
      tap((_) => console.log(`new comment on post=${comment.postId}`)),
      catchError(this.handleError<any>('addNewComment'))
    );
  }

  getPostComments(id: number) {
    const url = `${this.rootUrl}/${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      tap((_) => console.log(`get comments of a post=${id}`)),
      catchError(this.handleError<any>('getPostComments'))
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

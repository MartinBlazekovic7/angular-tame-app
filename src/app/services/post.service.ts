import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  rootUrl = 'http://localhost:8080/post';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addNewPost(post: Post) {
    return this.http.post(this.rootUrl, post, this.httpOptions).pipe(
      tap((_) => console.log(`new post by=${post.makerUsername}`)),
      catchError(this.handleError<any>('addNewPost'))
    );
  }

  likePost(id: number | undefined, username: string) {
    const url = `${this.rootUrl}/${id}/${username}`;
    return this.http.put(url, id, this.httpOptions).pipe(
      tap((_) => console.log(`liked a post=${id}`)),
      catchError(this.handleError<any>('likePost'))
    );
  }

  getPostLikes(id: number): Observable<User[]> {
    const url = `${this.rootUrl}/liked/${id}`;
    return this.http.get<User[]>(url, this.httpOptions).pipe(
      tap((_) => console.log(`get likes of a post=${id}`)),
      catchError(this.handleError<any>('getPostLikes'))
    );
  }

  deletePost(id: number) {
    const url = `${this.rootUrl}/${id}`;
    return this.http.delete<Post>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  rootUrl = 'http://localhost:8080/post';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  likePost(id: number | undefined, username: string) {
    const url = `${this.rootUrl}/${id}/${username}`;
    console.log('here', url);
    return this.http.put(url, id, this.httpOptions).pipe(
      tap((_) => console.log(`liked a post=${id}`)),
      catchError(this.handleError<any>('likePost'))
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

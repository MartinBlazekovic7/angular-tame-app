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

  constructor(private http: HttpClient) {}

  getUserDetails(username: string): Observable<User> {
    return this.http
      .get<User>(this.rootUrlUser + username, this.httpOptions)
      .pipe(
        tap((_) => console.log('fetched userdetails')),
        catchError(this.handleError<any>('getUserDetails', []))
      );
  }
  getUserPosts(username: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.rootUrlPost + 'maker=' + username, this.httpOptions)
      .pipe(
        tap((_) => console.log('fetched userPosts')),
        catchError(this.handleError<any>('getUserPosts', []))
      );
  }

  getFollowersOfUser(username: string): Observable<User[]> {
    return this.http
      .get<User[]>(this.rootUrlUser + 'following/' + username, this.httpOptions)
      .pipe(
        tap((_) => console.log('fetched userFollowers')),
        catchError(this.handleError<any>('getFollowersOfUser', []))
      );
  }

  getWhoUserFollows(username: string): Observable<User[]> {
    return this.http
      .get<User[]>(this.rootUrlUser + 'follows/' + username, this.httpOptions)
      .pipe(
        tap((_) => console.log('fetched userFollows')),
        catchError(this.handleError<any>('getWhoUserFollows', []))
      );
  }

  followUser(username: string, usernameOfWhoIWantToFollow: string) {
    const url = `${this.rootUrlUser}${username}/${usernameOfWhoIWantToFollow}`;
    return this.http.put(url, username, this.httpOptions).pipe(
      tap((_) => console.log(`followed a user=${usernameOfWhoIWantToFollow}`)),
      catchError(this.handleError<any>('followUser'))
    );
  }

  unfollowUser(username: string, usernameOfWhoIWantToUnFollow: string) {
    const url = `${this.rootUrlUser}${username}/${usernameOfWhoIWantToUnFollow}`;
    return this.http.delete(url).pipe(
      tap((_) =>
        console.log(`unfollowed a user=${usernameOfWhoIWantToUnFollow}`)
      ),
      catchError(this.handleError<any>('unfollowUser'))
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

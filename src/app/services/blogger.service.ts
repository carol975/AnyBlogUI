import { Injectable } from '@angular/core';
import { PostList } from './post.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, retry } from 'rxjs/operators';

export interface UserInfo {
  username: string,
  email: string,
  profile_image: string
}

export interface BloggerInfo {
  user_info: UserInfo,
  posts: PostList
}

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //TODO add error handling
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      //TODO add error handling
    }
    // return an observable with a user-facing error message
    return throwError('Error Occured');
  };
  constructor(private http: HttpClient) { }


  getUserInfo(username: string) {
    return this.http.get(`${environment.blogger_api}/${username}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}

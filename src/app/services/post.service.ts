import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
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

  get_feed_posts(){
    return this.http.get(`${environment.home_api}/feed`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  get_post(postId: string){
    console.log(`${environment.post_api}/${postId}`);
    return this.http.get(`${environment.post_api}/${postId}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}

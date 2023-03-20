import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken:	string;	// A Firebase Auth ID token for the newly created user.
  email: string;	// The email for the newly created user.
  refreshToken: string;	// A Firebase Auth refresh token for the newly created user.
  expiresIn: string;	// The number of seconds in which the ID token expires.
  localId: string;	// The uid of the newly created user.
  registered?: boolean; // Whether the email is for an existing account.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user = new BehaviorSubject<User>(new User('','','',new Date()));
  user = new BehaviorSubject<User | null>(null);

  private API_KEY = 'AIzaSyDIEqviVlKF9ZdNe-irNP4NNgj1Tmtc2XQ';
  private signinAPIEndpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY;
  private signupAPIEndpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY;

  constructor( private http: HttpClient, private router: Router ){}

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      this.signupAPIEndpoint,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap( responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        )
      })
    );
  }

  login( email:string, password: string ){
    return this.http.post<AuthResponseData>(
      this.signinAPIEndpoint,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        )
      })
    );
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const responseUser = new User(
      email,
      localId,
      idToken,
      expirationDate
    );
    this.user.next(responseUser);
    console.log('AUTHENTICATED');
    console.log(this.user);
  }

  private handleError( errorResponse: HttpErrorResponse ){
    let errorMessage = 'An unknown error occured.';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    // https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'That email address is already in use.';
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'That email address is invalid or the password is incorrect.';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'That email address is invalid or the password is incorrect.';
        break;

      case 'USER_DISABLED':
        errorMessage = 'The account associated with that email address has been diabled.';
        break;

      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Logging in is currently disabled.';
        break;

      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }

}

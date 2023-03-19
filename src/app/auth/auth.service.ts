import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
  idToken:	string;	// A Firebase Auth ID token for the newly created user.
  email: string;	// The email for the newly created user.
  refreshToken: string;	// A Firebase Auth refresh token for the newly created user.
  expiresIn: string;	// The number of seconds in which the ID token expires.
  localId: string;	// The uid of the newly created user.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signupAPIEndpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIEqviVlKF9ZdNe-irNP4NNgj1Tmtc2XQ';

  constructor( private http: HttpClient ){}

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      this.signupAPIEndpoint,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError( errorResponse => {
        let errorMessage = 'An unknown error occured.';
        if( !errorResponse.error || !errorResponse.error.error ){
          return throwError(() => new Error(errorMessage));
        }

        switch( errorResponse.error.error.message ){
          case 'EMAIL_EXISTS':
            errorMessage = 'That email address is already in use.';
        }

        return throwError(() => new Error(errorMessage));
      })
    )
  }
}

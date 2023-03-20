import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private authService: AuthService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        console.log('user is: ', user);

        if( !user || !user.token ){
          console.log('no user, continuing...');
          return next.handle(req);
        } else {
          console.log('user found...');
          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', user.token)
          });
          return next.handle(modifiedReq);
        }


      })
    );

  }

}

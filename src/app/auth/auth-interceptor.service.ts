import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private authService: AuthService ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        // console.log('request is: ', req);
        // console.log('user is: ', user);

        if( !user || !user.token ){
          // console.log('no user, continuing...');
          return next.handle(req);

        }

        // console.log('user found...');
        // eslint-disable-next-line prefer-const
        let newParams = new HttpParams().set('auth', user.token).set('timeout', '15s');
        // console.log('newParams is: ', newParams.get('auth'), newParams.get('timeout'));
        const modifiedReq = req.clone({
          // url: req.url + '/' + user.id,
          params: newParams,
        });
        // console.log('modifiedReq is: ', modifiedReq);
        return next.handle(modifiedReq);


      })
    );

  }

}

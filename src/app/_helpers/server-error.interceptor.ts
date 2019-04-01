import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AlertService } from '../_services';

import { UserService } from '../_services';
import {Router} from '@angular/router';
import {debug} from 'util';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService,
                private alertService: AlertService,
                private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // If the call fails, retry until 2 times before throwing an error
      return next.handle(request).pipe(retry(1), catchError(

        (err: HttpErrorResponse) => {
          console.log('in HttpInterceptor');

          if (!navigator.onLine) {
            this.alertService.error('Oops, internet connection has a problems. Please, try later');
            err.error.message = 'No Internet Connection';
          } else {
            switch (err.status) {
              case 0:
                console.log('case 0');
                this.router.navigate(['/error'], {queryParams: {type: 'connection'}});
                break;
              case 401:
                // auto logout if 401 response returned from api
                this.alertService.error('Please, verify information about yourself');
                this.userService.logout();
                location.reload(true);
                break;
                case 403:
                this.router.navigate(['/error'], {queryParams: {type: 403}});
                break;
                case 404:
                  this.router.navigate(['/error'], {queryParams: {type: 404}});
                break;
              default:
                 if ((err.error.message !== null) && (err.error.message !== 'No message available')) {
                  console.log('Testing in error intercept ' + err.error.message);
                  this.alertService.error(err.error.message || err.statusText);
                } else {
                  this.alertService.error('Oops! Something went wrong. Please, try later');
                }
                break;
            }
          }
          const error = err.error.message || err.statusText;
          console.log('Handled error from back-end server:');
          console.log(error);
          return of(error);
        }));
    }
}

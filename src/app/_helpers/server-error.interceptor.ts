import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AlertService} from '../_services';

import {UserService} from '../_services';
import {ErrorService} from '../_services/error-service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private userService: UserService,
              private alertService: AlertService,
              private errorService: ErrorService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // If the call fails, retry until 2 times before throwing an error
    return next.handle(request).pipe(catchError(
      (err: HttpErrorResponse) => {
        console.log('Handling error of application from server...');
        this.errorService.getServerErrorMessage(err);
        const error = err.error.message || err.statusText;
        console.log('Handled error from back-end server:');
        console.log(error);
        return throwError(error);
      }));
  }
}

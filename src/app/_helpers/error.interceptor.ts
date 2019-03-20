import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../_services';

import { UserService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private userService: UserService,
                private alertService: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          if (err.status === 401) {
              // auto logout if 401 response returned from api
              this.userService.logout();
              location.reload(true);
          }
         //   switch (err.status) {
         //     case 401:
         //       // auto logout if 401 response returned from api
         //       this.alertService.error('Please, verify information about yourself');
         //       this.userService.logout();
         //       location.reload(true);
         //       break;
         //       case 403:
         //         this.alertService.error('403: Access denied');
         //         break;
         //       case 404:
         //         this.alertService.error('404: Page not found');
         //         break;
         //       default:
         //         this.alertService.error('Unknown error');
         //         break;
         //   }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}

import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {AlertService} from '../_services';
import {ErrorService} from '../_services/error-service';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  // Error handling is important and needs to be loaded first.
  // Because of this should manually inject the services with Injector.
  constructor(private injector: Injector) {
  }

  handleError(error: Error) {
    const router = this.injector.get(Router);
    console.log('In handle error');
    // Client Error
    console.log('client error');
    console.error('error handler' + error);
    router.navigate(['/error'], {queryParams: {type: 'inner'}});
    throwError(error);
  }

}

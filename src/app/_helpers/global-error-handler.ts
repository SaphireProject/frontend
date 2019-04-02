import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {ErrorService} from '../_services/error-service';
import {throwError} from 'rxjs';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  // Error handling is important and needs to be loaded first.
  // Because of this should manually inject the services with Injector.
  constructor(private injector: Injector) {
  }

  handleError(error: Error) {
    console.log('Handling inner error of application (in client-side...');
    console.error('Error was handled: ' + error);
    const errorService = this.injector.get(ErrorService);
    errorService.getClientErrorMessage(error);
    // Client Error
    throwError(error);
  }

}

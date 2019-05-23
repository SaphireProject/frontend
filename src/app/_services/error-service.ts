import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {AlertService} from './alert.service';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private alertService: AlertService,
              private userService: UserService,
              private router: Router) {}

  // getClientErrorMessage(err: Error) {
  //   console.error('Navigate to page error... ' + err);
  //   this.router.navigate(['/error'], {queryParams: {type: 'inner'}});
  // }

  getServerErrorMessage(err: HttpErrorResponse) {
    // if (!navigator.onLine) {
    //   console.log('Navigator Online Problems');
    //   this.alertService.error('Oops, internet connection has a problems. Please, try later');
    //   err.error.message = 'No Internet Connection';
    // } else {
    //   switch (err.status) {
    //     case 0:
    //       console.log('Case 0: Server without reply');
    //       this.router.navigate(['/error'], {queryParams: {type: 'connection'}});
    //       break;
    //     case 401:
    //       // auto logout if 401 response returned from api
    //       this.alertService.error('Please, verify information about yourself');
    //       this.userService.logout();
    //       location.reload(true);
    //       break;
    //     case 403:
    //       this.router.navigate(['/error'], {queryParams: {type: 403}});
    //       break;
    //     case 404:
    //       this.router.navigate(['/error'], {queryParams: {type: 404}});
    //       break;
    //     case 410:
    //       this.router.navigate(['/error'], {queryParams: {type: 410}});
    //       break;
    //     default:
    //       if ((err.error.message !== null) && (err.error.message !== 'No message available')) {
    //         console.log('Testing in error intercept ' + err.error.message);
    //         this.alertService.error(err.error.message || err.statusText);
    //       } else {
    //         this.alertService.error('Oops! Something went wrong. Please, try later');
    //       }
    //       break;
    //   }
    // }
  }


}

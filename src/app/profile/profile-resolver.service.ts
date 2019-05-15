import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {Observable, throwError} from 'rxjs';

import { Profile} from '../_models';
import { catchError } from 'rxjs/operators';
import { UserService} from '../_services';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  constructor(private userService: UserService) {}

  // resolve(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<any> {
//
  //   return this.profilesService.get(route.params['username'])
  //     .pipe(catchError((err) => this.router.navigateByUrl('/')));
//
  // }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log('in ProfileResolver');
    // return this.userService.getUserProfile(route.params['username']) - when user-management will be done
    return this.userService.getUserProfile()
      .pipe(catchError((err) => {
        console.log('in catching error of profile');
        return throwError(err);
      }));
  }
}

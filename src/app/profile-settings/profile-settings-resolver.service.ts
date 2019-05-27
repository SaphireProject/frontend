import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {Observable, throwError} from 'rxjs';

import { Profile} from '../_models';
import { catchError } from 'rxjs/operators';
import { UserService} from '../_services';

@Injectable()
export class ProfileSettingsResolver implements Resolve<Profile> {
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
    const idOfUser = this.userService.currentUserValue.id;
    return this.userService.getUserProfile(idOfUser)
    // return this.userService.getUserProfile()
      .pipe(catchError((err) => {
        console.log('in catching error of profile');
        return throwError(err);
      }));
  }
}

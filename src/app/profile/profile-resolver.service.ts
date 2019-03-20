import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Profile} from '../_models';
import {catchError, first} from 'rxjs/operators';
import {AlertService, UserService} from '../_services';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

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
    console.log('ProfileResolver');
    // return this.userService.getUserProfile(route.params['username']) - when user-management will be done
    return this.userService.getUserProfile()
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}


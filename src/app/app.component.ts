import {Component, OnInit} from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError,
  NavigationStart, Router } from '@angular/router';

import { UserService } from './_services';
import { User } from './_models';


@Component({ selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']})
export class AppComponent implements OnInit {

    currentUser: User;
    loading = false;
    interval: any;

    constructor(
        private router: Router,
        private userService: UserService
    ) {
      this.router.events.subscribe((event: Event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });
    }
    ngOnInit() {
      this.userService.currentUser.subscribe(x => this.currentUser = x);
      this.refreshData();
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
          this.refreshData();
        }, 50000);
    }
  logout() {
        this.userService.logout();
        this.router.navigate(['/login']);
    }

  refreshData() {
      console.log('refreshing data');
    if (this.currentUser) {
      this.userService.updateGlobalProfileData().subscribe();
    }
  }



}

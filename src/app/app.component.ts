import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './_services';
import { User } from './_models';
import {Subject} from 'rxjs';


@Component({ selector: 'app',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css']})
export class AppComponent implements OnInit, OnDestroy {
    private unsubscribe: Subject<any> = new Subject();

    currentUser: User;
    data: any;
    interval: any;

    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {
      this.userService.currentUser.subscribe(x => this.currentUser = x);
      this.refreshData();
        if (this.interval) {
          clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
          this.refreshData();
        }, 10000);
    }
  logout() {
        this.userService.logout();
        this.router.navigate(['/login']);
    }

  refreshData() {
      console.log('refreshing data');
    if (this.currentUser) {
      this.userService.updateData().subscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}

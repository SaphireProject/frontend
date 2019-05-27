import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../_models';
import { UserService } from '../_services';
import test from 'src/assets/images/tanks_robo/test.json';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;

    constructor(
        private userService: UserService
    ) {
        this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }
    ngOnInit() {

      let keks: string;
      keks = JSON.stringify(test);
      console.log(keks);
      console.log(test);

      // let test = '{"keys": 12}';
      // let test2 = JSON.parse(test);
      // console.log(test2.keys);
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
}

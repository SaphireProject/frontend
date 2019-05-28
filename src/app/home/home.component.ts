import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../_models';
import { UserService } from '../_services';
import {Router} from '@angular/router';
import {NotificationService} from '../_services/notification.service';

@Component({selector: 'app-home',
            templateUrl: 'home.component.html',
            styleUrls: ['./home.component.css']})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    items: any[];
    countOfNotification: number;

    constructor(
        private userService: UserService,
        private router: Router,
        private notificationService: NotificationService
    ) {
      this.items = [
        {
          id: 1,
          imgSrc: 'assets/images/undraw_old_day_6x25.svg',
          header: 'Create a game',
          secondHeader: 'Room Creator',
          description:
          // tslint:disable-next-line:max-line-length
            'Create game and fight with your friends',
        },
        {
          id: 2,
          imgSrc: 'assets/images/undraw_artificial_intelligence_upfn.svg',
          header: 'See Profile',
          secondHeader: 'Profile Page',
          description:
          // tslint:disable-next-line:max-line-length
            'Look at your profile and share info about yourself',
        },
        {
          id: 3,
          imgSrc: 'assets/images/undraw_robotics_kep0.svg',
          header: 'Contact us',
          secondHeader: 'Help Center',
          description:
          // tslint:disable-next-line:max-line-length
            'Contact with us for any question',
        },
      ];
        this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
            this.currentUser = user;
        });

    }


    ngOnInit() {
      this.notificationService.countOfNewNotifications.subscribe(data => {
        this.countOfNotification = data.countOfNotifications;
      });
      // let test = '{"keys": 12}';
      // let test2 = JSON.parse(test);
      // console.log(test2.keys);
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

  redirectTo(item: any) {
      console.log('click!');
    switch (item.id) {
      case 1:
        this.router.navigate(['/create-room']);
        break;
      case 2:
        this.router.navigate(['/profile/me']);
        break;
      case 3:
        this.router.navigate(['/contact']);
    }
  }

  checkNotifications() {
    if (this.countOfNotification < 1) {
      return 'No new invites appeared';
    } else {
      return `You have ${this.countOfNotification} new invites`;
    }
  }
}

import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../../_services';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../_models';
import {IGetNotificationNewResponse} from '../../_models/game-rooms-models/response/IGetNotificationNewResponse';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  currentCountOfNotification: number;
  hideOfNotification = true;
  countOfNewNotifications$: Subscription;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private router: Router,
              private userService: UserService,
              private notificationService: NotificationService,
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.notificationService.getNewNotifications();
    this.countOfNewNotifications$ = this.notificationService.countOfNewNotifications.subscribe((data: IGetNotificationNewResponse) => {
      if (data.countOfNotifications === this.currentCountOfNotification) {
        return;
      } else {
        if (data.countOfNotifications < 1) {
          this.hideOfNotification = true;
        } else {
            this.hideOfNotification = false;
            this.currentCountOfNotification = data.countOfNotifications;
        }
      }

    });
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  goToNotificationPage() {
    this.hideOfNotification = true;
    this.currentCountOfNotification = 0;
    this.router.navigate(['/notifications']);
  }
}


import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {UserService} from '../../_services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {User} from '../../_models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private router: Router,
              private userService: UserService,
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  onToggleSidenav = () => {
      this.sidenavToggle.emit();
    }
}


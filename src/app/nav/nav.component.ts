import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  appTitle = 'CrazyRobots';

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}

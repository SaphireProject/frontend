import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, User } from '../_models/';
import { UserService } from '../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  currentUser: User;
  isUser: boolean;

  constructor(private  userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { profile: Profile }) => {
        this.profile = data.profile;
        // Load the current user's data.
        this.userService.currentUser.subscribe(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        );
      }
    );
  }
  /*
  ngOnInit() {
    this.route.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        // Load the current user's data.
        this.userService.currentUser.subscribe(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        );
      }
    );
   */


}

import { Component, OnInit } from '@angular/core';
import { Profile, User } from '../_models/';
import { UserService } from '../_services';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  currentUser: User;
  toggle = false;
  currentUserSubscription: Subscription;

  constructor(private  userService: UserService) { }

  ngOnInit() {
 //   this.userService.getUserProfile()
 //     .pipe(first())
 //     .subscribe(
 //       data => {console.log(data.username);
 //       },
 //       error => {});
//

      this.currentUserSubscription = this.userService.getUserProfile().subscribe(profile => {
        this.profile = profile;
        console.log(profile.email);
      });
  }


  onProfileEdit() {
    this.toggle = true;
  }

}

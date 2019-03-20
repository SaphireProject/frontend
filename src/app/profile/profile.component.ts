import { Component, OnInit } from '@angular/core';
import { Profile, User } from '../_models/';
import { UserService } from '../_services';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {ActivatedRoute} from '@angular/router';
import {concatMap, tap} from 'rxjs/operators';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  currentUser: User;
  toggle = false;
  isUser: boolean;

  constructor(private  userService: UserService,
              private  route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        this.profile = data.profile;
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        ));
      })
    ).subscribe();
  }

 //   this.userService.getUserProfile()
 //     .pipe(first())
 //     .subscribe(
 //       data => {console.log(data.username);
 //       },
 //       error => {});
//

 //     this.currentUserSubscription = this.userService.getUserProfile().subscribe(profile => {
 //       this.profile = profile;
 //       console.log(profile.email);
 //     });
  onProfileEdit() {
    this.toggle = true;
  }

}

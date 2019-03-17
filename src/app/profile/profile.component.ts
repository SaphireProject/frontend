import { Component, OnInit } from '@angular/core';
import { Profile, User } from '../_models/';
import { UserService } from '../_services';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('imageAnimation', [

      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(2)',
      })),

      transition('small <=> large', animate('500ms ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-80%)', offset: 0}),
        style({opacity: 1, transform: 'translateY(25px)', offset: 1})
      ]))),
    ]),
  ]
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  currentUser: User;
  toggle = false;
  currentUserSubscription: Subscription;
  public state = 'small';

  constructor(private  userService: UserService) { }

  ngOnInit() {
 //   this.userService.getUserProfile()
 //     .pipe(first())
 //     .subscribe(
 //       data => {console.log(data.username);
 //       },
 //       error => {});
//

      this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
  }

  public animateImage(): void {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  onProfileEdit() {
    this.toggle = true;
  }

}

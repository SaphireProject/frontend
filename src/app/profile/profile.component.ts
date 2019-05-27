import {Component, OnInit} from '@angular/core';
import {Profile, User} from '../_models/';
import {UserService} from '../_services';
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
  // toggle = false;
  isUser: boolean;

  constructor(private  userService: UserService,
              private  route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.pipe(
      concatMap((data: { profile: Profile }) => {
        console.log('in concat Map');
        console.log(data);
        this.profile = data.profile;
        return this.userService.currentUser.pipe(tap(
          (userData: User) => {
            console.log('in currentUser');
            this.currentUser = userData;
            this.isUser = (this.currentUser.username === this.profile.username);
          }
        ));
      })
    ).subscribe();
  }

  // onProfileEdit() {
  //   this.toggle = true;
  // }


}

import {Component, OnInit} from '@angular/core';
import {Profile, User} from '../_models/';
import {UserService} from '../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {concatMap, tap} from 'rxjs/operators';
import {DataRoomService} from '../_services/dataroom.service';


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
  idOfUser: number;

  constructor(private  userService: UserService,
              private  route: ActivatedRoute,
              private dataRoomService: DataRoomService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.pipe(
      concatMap(data => {
        console.log('in concat Map');
        console.log(data);
        this.profile = data.profile;
        this.idOfUser = data.profile.idOfUser;
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


  inviteToPlay() {
    console.log(this.idOfUser);
    this.dataRoomService.addToInviteBuffer(this.idOfUser, this.profile.username);
    this.router.navigate(['/create-room']);
  }
}

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService, UserService} from '../_services';
import {MatStepper} from '@angular/material';
import {DataRoomService} from '../_services/dataroom.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-roomcreator',
  templateUrl: './roomcreator.component.html',
  styleUrls: ['./roomcreator.component.css']
})
export class RoomcreatorComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  roomForm: FormGroup;
  choosenGame: string;
  submitted = false;
  value = 'Clear me';
  isLinear = true;
  isCompletedFirstPage = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private dataRoomService: DataRoomService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      nameOfRoom: ['', [Validators.required, Validators.maxLength(50)]],
      sizeOfMap: ['50', [Validators.required, Validators.max(1000), Validators.min(10), Validators.nullValidator], ],
      countOfPlayers: ['', [Validators.min(2), Validators.max(100), Validators.pattern('^[0-9]*$')], ]}
      );
  }

  getNameOfRoomErrorMessage() {
    return this.f.nameOfRoom.hasError('required') ? 'Name of room is required' :
      this.f.nameOfRoom.hasError('maxlength') ? 'Ooops, name is so big! It must be less than 50 characters' :
        '';
  }

  getMapErrorMessage() {
    return this.f.sizeOfMap.hasError('required') ? 'Count sells is required' :
      this.f.sizeOfMap.hasError('max') ? 'Ooops, it could be very big map' :
      this.f.sizeOfMap.hasError('min') ? 'Ooops, it could be very small map' :
        '';
  }

  getCountOfPlayersErrorMessage() {
    return this.f.countOfPlayers.hasError('max') ? 'Maximum number of players: 1000' :
        this.f.sizeOfMap.hasError('min') ? 'Minimum number of players: 2' :
          '';
  }

  get f() { return this.roomForm.controls; }

  onSubmit() {
    if ((this.f.sizeOfMap.invalid) || (this.f.nameOfRoom.invalid)) {
    this.submitted = true;
    this.alertService.error('Please, enter correct info about you');
    return;
    }

    // this.isCompletedFirstPage = true;
    this.moveStepper('next');




  }

  onSelectGame(choosenGame: string) {
    this.moveStepper('next');
  }

  private moveStepper(direction: string) {
    switch (direction) {
      case 'back': {
        this.isLinear = false;
        setTimeout(() => {
          this.stepper.previous();
          this.isLinear = true;
        }, 100);
        break;
      }
      case 'next': {
        this.isLinear = false;
        setTimeout(() => {
          this.stepper.next();
          this.isLinear = true;
        }, 100);
      }
    }
  }

  onReturnBack() {
    this.moveStepper('back');
  }

  startTheGame() {
    const idOfAdmin = this.userService.currentUserValue.id;
    const usernameOfAdmin = this.userService.currentUserValue.username;
    const game = this.choosenGame;
    const nameOfRoom = this.roomForm.value.nameOfRoom;
    let countOfPlayers = Number(this.roomForm.value.countOfPlayers);
    if (countOfPlayers < 2) {
      countOfPlayers = 100;
    }
    const heightOfMapForGame = Number(this.roomForm.value.sizeOfMap);
    const widthOfMapForGame = Number(this.roomForm.value.sizeOfMap);
    this.dataRoomService.createGameRoom(
      {
        idOfAdmin: idOfAdmin,
        usernameOfAdmin: usernameOfAdmin,
        game: game,
        nameOfRoom: nameOfRoom,
        countOfPlayers: countOfPlayers,
        heightOfMapForGame: heightOfMapForGame,
        widthOfMapForGame: widthOfMapForGame
      }
    ).subscribe(data => {
        this.dataRoomService.addRoomStorage(data.idOfRoom);
        this.router.navigate(['/room', data.idOfRoom]);
    },
      error => {
      this.alertService.error('Oops, something going wrong. Please, try later');
      });
  }
}

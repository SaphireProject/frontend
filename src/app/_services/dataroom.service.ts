import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AlertService} from './alert.service';
import {environment} from '../../environments/environment';
import {IInviteUserInGameRequest} from '../_models/game-rooms-models/request/IInviteUserInGameRequest';
import {IInviteUserInGameResponse} from '../_models/game-rooms-models/response/IInviteUserInGameResponse';
import {IDeletedInvitedUserResponse} from '../_models/game-rooms-models/response/IDeletedInvutedUserResponse';
import {IGetUserStatusResponse, IUserStatus} from '../_models/game-rooms-models/response/IGetUserStatusResponse';
import {IConfirmUserIsReadyToGameRequest} from '../_models/game-rooms-models/request/IConfirmUserIsReadyToGameRequest';
import {IConfirmUserIsReadyToGameResponse} from '../_models/game-rooms-models/response/IConfirmUserIsReadyToGameResponse';
import {UserService} from './user.service';


@Injectable()
export class DataRoomService {


  dataChange: BehaviorSubject<IUserStatus[]> = new BehaviorSubject<IUserStatus[]>([]);
  readyToGame: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  dialogData: IUserStatus;

  constructor(private httpClient: HttpClient,
              private alertService: AlertService,
              private userService: UserService) {
  }

  get data(): IUserStatus[] {
    return this.dataChange.value;
  }

  getDialogData() {
    console.log('wtf');
    console.log(this.dialogData);
    return this.dialogData;
  }

  addUser(user: string): void {
    this.dialogData = {idOfUser: 99, username: user, email: 'test@m', readyToPlay: 0, chosenTank: null};
    console.log(this.dataChange.getValue());
    console.log(this.dialogData);
    // this.httpClient.post<IInviteUserInGameResponse>(`${environment.apiUrl}invite-user`, user).subscribe(data => {
    //     this.dialogData = {idOfUser: data.id, username: data.username, email: data.email, readyToPlay: 0, chosenTank: null};
    //     this.alertService.success('User was successfully added');
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.alertService.error('User has not been added. Details: ' + err.name + ' ' + err.message);
    //   });
  }

  updateUser(user): void {
    this.dialogData = user;
  }

  deleteUser(idOfUser: number): void {
    this.httpClient.delete<IDeletedInvitedUserResponse>(`${environment.apiUrl}invite-admin`, {params: new HttpParams().set('idOfUser', `${idOfUser}`)}).subscribe(data => {
        console.log(data['']);
        this.alertService.success('User was deleted');
      },
      (err: HttpErrorResponse) => {
        this.alertService.error('User has not been deleted');
        console.log(err.name + ' ' + err.message);
      }
    );
  }

  getAllUsers() {
    // setTimeout(() => {
    //   let ELEMENT_DATA: IUserStatus[] = [
    //     {idOfUser: 1, username: 'Hydrogen', email: 'tet@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 2, username: 'Helium', email: 'tet@masl.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 4, username: 'Beryllium', email: 'tet@mal.com', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 5, username: 'Boron', email: 'tet@emal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 6, username: 'Carbon', email: 'twqet@emal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 7, username: 'Nitrogen', email: 'dftet@emal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 8, username: 'Oxygen', email: 'tets@emal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},      {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},      {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},      {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},      {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},      {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 10, username: 'Neon', email: 'dsfs@.ru', readyToPlay: 0, chosenTank: 'sdfsf'}
    //   ];
    // this.dataChange.next(ELEMENT_DATA);
    // }, 400)
    // ;
    //
    // console.log('in element data');
    // console.log(this.dataChange.value);

    this.httpClient.get<IGetUserStatusResponse>(`${environment.apiUrl}game-status`).subscribe(data => {
        this.checkForReadyToGame(data.users);
        this.dataChange.next(data.users);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });

  }

  private checkForReadyToGame(users: IUserStatus[]) {
    console.log('check for game:');
    console.log(users.every(x => x.readyToPlay === 2));
    if (users.every(x => x.readyToPlay === 2)) {
      this.readyToGame.next(true);
      this.readyToGame.complete();
    }
  }

  nextPackUsers(test: IUserStatus[]) {
    this.checkForReadyToGame(test);
    this.dataChange.next(test);
    console.log('in test');
    console.log(this.dataChange.value);
  }

  confirmReadyToPlay(chosenTank: string, idOfChosenStrategy: number) {
    // todo
    const idOfRoom = 1;
    const username = this.userService.currentUserValue.username;
    return this.httpClient.post<IConfirmUserIsReadyToGameResponse>(`${environment.apiUrl}user-ready`, {
        username: username,
        idOfChosenStrategy: idOfChosenStrategy,
        idOfRoom: idOfRoom,
        chosenTank: chosenTank,
    });
  }
}



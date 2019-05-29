import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
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
import {ICreateRoomRequest} from '../_models/game-rooms-models/request/ICreateRoomRequest';
import {ICreateRoomResponse} from '../_models/game-rooms-models/response/ICreateRoomResponse';
import {map} from 'rxjs/operators';
import {conditionallyCreateMapObjectLiteral} from '@angular/compiler/src/render3/view/util';
import {IGetGameIsStartedResponse} from '../_models/game-rooms-models/response/IGetGameIsStartedResponse';

export const enum PlayerRole {
  player,
  admin,
  deleted
}

@Injectable()
export class DataRoomService {


  dataChange: BehaviorSubject<IUserStatus[]> = new BehaviorSubject<IUserStatus[]>([]);
  readyToGameSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readyToGame = this.readyToGameSubject.asObservable();
  playerRoleSubject: BehaviorSubject<PlayerRole> = new BehaviorSubject<PlayerRole>(PlayerRole.player);
  playerRole = this.playerRoleSubject.asObservable();
  inviteBufferSubject: ReplaySubject<number> = new ReplaySubject<number>(1);
  inviteBuffer = this.inviteBufferSubject.asObservable();

  maxLengthOfRoomStorage: number;
  idOfRoomStorage: number;
  dialogData: IUserStatus;

  constructor(private httpClient: HttpClient,
              private alertService: AlertService,
              private userService: UserService) {
  }

  get data(): IUserStatus[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  addUser(user: string): void {
    // this.dialogData = {idOfUser: 99, username: user, email: 'test@m', readyToPlay: 0, chosenTank: null};
    // console.log(this.dataChange.getValue());
    // console.log(this.dialogData);
    const idOfRoom = this.idOfRoomStorage;
    this.dialogData = {idOfUser: null, username: user, email: null, readyToPlay: 0, chosenTank: null};
    console.log('wer');
    console.log(user);
    this.httpClient
      .post<IInviteUserInGameResponse>(`${environment.apiUrl2}invite-user`,
        {
          username: user,
          idOfRoom: idOfRoom
        })
      .subscribe(data => {
          this.getAllUsers();
          this.alertService.success('User was successfully added');
        },
        (err: HttpErrorResponse) => {
          this.alertService.error('User has not been added. Details: ' + err.name + ' ' + err.message);
        });
  }

  updateUser(user): void {
    this.dialogData = user;
  }

  deleteUser(idOfUser: number): void {
    // todo undefied id's
    const idOfRoom = this.idOfRoomStorage;
    this.httpClient.delete<IDeletedInvitedUserResponse>(`${environment.apiUrl2}invite-admin`, {
      params: new HttpParams()
        .set('idOfUser', `${idOfUser}`)
        .set('idOfRoom', `${idOfRoom}`)
    })
      .subscribe(data => {
          this.getAllUsers();
          this.alertService.success('User was deleted');
        },
        (err: HttpErrorResponse) => {
          this.alertService.error('User has not been deleted');
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
    //     {idOfUser: 8, username: 'Oxygen', email: 'tets@emal.ru',
    //     readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 9, username: 'Fluorine', email: 'fd@asm.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
    //     {idOfUser: 10, username: 'Neon', email: 'dsfs@.ru', readyToPlay: 0, chosenTank: 'sdfsf'}
    //   ];
    // this.dataChange.next(ELEMENT_DATA);
    // }, 400)
    // ;
    //
    // console.log('in element data');
    // console.log(this.dataChange.value);

    this.httpClient.get<IGetUserStatusResponse>(`${environment.apiUrl2}game-status`, {
      params: new HttpParams()
        .set('idOfRoom', `${this.idOfRoomStorage}`)
    }).subscribe(data => {
        const idOfUser = this.userService.currentUserValue.id;
        // if ((data.idOfAdmin === idOfUser) && (this.playerRole.value !== PlayerRole.admin)) {
        //   console.log("adminchik");
        //   this.playerRole.next(PlayerRole.admin);
        // }
        this.maxLengthOfRoomStorage = data.countOfUsers;
        console.log('COUTN OF USERS');
        console.log(this.maxLengthOfRoomStorage);
        console.log('response');
        console.log(data);
        this.getPlayerStatus(data);
        // this.checkForAcceptInLoby(data.users);
        this.checkForReadyToGame(data.users);
        console.log(data);
        this.dataChange.next(data.users);
      },
      (error: HttpErrorResponse) => {
        this.alertService.error('Oops, something wrong! Please, try later');
      });
  }

  getPlayerStatus(gameStatus: IGetUserStatusResponse) {
    const idOfUser = this.userService.currentUserValue.id;
    if ((gameStatus.idOfAdmin === idOfUser) && (this.playerRoleSubject.value !== PlayerRole.admin)) {
      this.playerRoleSubject.next(PlayerRole.admin);
    } else {
      if (gameStatus.users.findIndex((x) => x.idOfUser === idOfUser) < 0) {
        this.playerRoleSubject.next(PlayerRole.deleted);
      }
    }

  }

  private checkForReadyToGame(users: IUserStatus[]) {
    console.log('checkForReadt');
    console.log(users);
    if (users.every(x => x.readyToPlay === 2)) {
      console.log('all ready');
      if (users.length > 1) {
        if (this.readyToGameSubject.value !== true) {
          console.log('NEXT TRUE');
          this.readyToGameSubject.next(true);
        }
      } else {
        this.readyToGameSubject.next(false);
      }
    } else {
      console.log('NEXT FALSE');
      this.readyToGameSubject.next(false);
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

    const idOfRoom = this.idOfRoomStorage;
    const username = this.userService.currentUserValue.username;
    return this.httpClient.post<IConfirmUserIsReadyToGameResponse>(`${environment.apiUrl2}user-ready`, {
      username: username,
      idOfChosenStrategy: idOfChosenStrategy,
      idOfRoom: idOfRoom,
      chosenTank: chosenTank,
    });
  }

  createGameRoom(roomDescription: ICreateRoomRequest) {
    return this.httpClient.post<ICreateRoomResponse>(`${environment.apiUrl2}room`, roomDescription);
  }

  addRoomStorage(idOfRoom: number) {
    this.idOfRoomStorage = idOfRoom;
  }

  clearRoomStorage() {
    this.idOfRoomStorage = null;
  }

  private checkForAcceptInLoby(users: [IUserStatus]) {
    const idOfUser = this.userService.currentUserValue.id;
    if (users.findIndex((x) => x.idOfUser === idOfUser) < 0) {
      this.playerRoleSubject.next(PlayerRole.deleted);
    }
  }

  getUserStatus(idOfRoom: number) {
    const idOfUser = this.userService.currentUserValue.id;
    return this.httpClient.get<IGetUserStatusResponse>(`${environment.apiUrl2}game-status`, {
      params: new HttpParams()
        .set('idOfRoom', `${idOfRoom}`)
    }).pipe(map(data => {
      return data.users.find(x => x.idOfUser === idOfUser).readyToPlay;
    }));
  }

  startTheGame() {
    return this.httpClient.get(`${environment.apiUrl2}game/start`);
  }

  leaveFromRoom(idOfRoom: number) {
    const username = this.userService.currentUserValue.username;
    const idOfUser = this.userService.currentUserValue.id;
    console.log({idOfUser, username, idOfRoom});
    this.httpClient.post<IDeletedInvitedUserResponse>(`${environment.apiUrl2}game/exit`, {
      idOfUser: idOfUser,
      idOfRoom: idOfRoom,
      username: username,
    }).subscribe(() => {
      console.log('user deleted');
    }, error1 => this.alertService.error('You are not leaved from room'));
  }

  addToInviteBuffer(idOfUser: number, username: string) {
    const bufferInvite = username;
    localStorage.setItem('bufferInvite', JSON.stringify(username));
  }

  checkForGameIsReady() {
    return this.httpClient.get<IGetGameIsStartedResponse>(`${environment.apiUrl2}game/is-started`,
      {
        params: new HttpParams()
          .set('idOfRoom', String(this.idOfRoomStorage))
      });
  }
}



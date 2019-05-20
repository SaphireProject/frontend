import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {AlertService} from './alert.service';
import {environment} from '../../environments/environment';
import {IInviteUserInGameRequest} from '../_models/game-rooms-models/request/IInviteUserInGameRequest';
import {IInviteUserInGameResponse} from '../_models/game-rooms-models/response/IInviteUserInGameResponse';
import {IDeletedInvutedUserResponse} from '../_models/game-rooms-models/response/IDeletedInvutedUserResponse';

@Injectable()
export class DataRoomService {
  dialogData: any;

  constructor (private httpClient: HttpClient,
               private alertService: AlertService) {}

  getDialogData() {
    return this.dialogData;
  }

  addUser (user: IInviteUserInGameRequest): void {
    this.dialogData = user;
    this.httpClient.put<IInviteUserInGameResponse>(`${environment.apiUrl}invite-user`, user).subscribe(data => {
        this.dialogData = data;
        this.alertService.success('User was successfully added');
      },
      (err: HttpErrorResponse) => {
        this.alertService.error('User has not been added. Details: ' + err.name + ' ' + err.message);
      });
  }

  updateUser (user): void {
    this.dialogData = user;
  }

  deleteUser (idOfUser: number): void {
    this.httpClient.delete<IDeletedInvutedUserResponse>(`${environment.apiUrl}invite-user`, {params: new HttpParams().set('id', `${idOfUser}`) }).subscribe(data => {
        console.log(data['']);
        this.alertService.success('User was deleted');
      },
      (err: HttpErrorResponse) => {
        this.alertService.error('User has not been added. Details: ' + err.name + ' ' + err.message);
      }
    );
  }
}

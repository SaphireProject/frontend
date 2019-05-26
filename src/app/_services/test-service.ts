import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IGetAllNotificationsResponse} from '../_models/game-rooms-models/response/IGetAllNotificationsResponse';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class TestService {

  constructor(private http: HttpClient) {}

  getAllNotifications() {
    console.log('Get all notif');
    // setTimeout(() => {
    //   let ELEMENT_DATA: NotificationInfo[] = [
    //     {
    //       idOfInvite: '5',
    //       idOfRoom: 3,
    //       nameOfRoom: 'fdsfs',
    //       idOfAdmin: 9,
    //       usernameOfAdmin: 'dsf',
    //       emailOfAdmin: 'kek@mail.ru',
    //       countOfPlayers: 5,
    //       heightOfMapForGame: 10,
    //       widthOfMapForGame: 10
    //     }
    //
    //   ];
    //   this.dataChange.next(ELEMENT_DATA);
    // }, 400);

    this.http.get<IGetAllNotificationsResponse>(`${environment.apiUrl2}notification`).subscribe(data => {
        console.log('all notif resp TEST TEST');
        console.log(data);
        console.log(data.invite);
      },
      (error: HttpErrorResponse) => {
        console.log('ERRRRRRARRRRR');
        console.log(error);
      });
  }
}

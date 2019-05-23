import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models';
import {IGetNotificationNewResponse} from '../_models/game-rooms-models/response/IGetNotificationNewResponse';
import {map} from 'rxjs/operators';
import {IGetUserStatusResponse, IUserStatus} from '../_models/game-rooms-models/response/IGetUserStatusResponse';
import {IGetAllNotificationsResponse, NotificationInfo} from '../_models/game-rooms-models/response/IGetAllNotificationsResponse';
import {IDeletedInvitedUserResponse} from '../_models/game-rooms-models/response/IDeletedInvutedUserResponse';
import {UserService} from './user.service';
import {AlertService} from './alert.service';
import {IDeletedInvitedUserRequest} from '../_models/game-rooms-models/request/IDeletedInvitedUserRequest';
import {IAcceptInviteResponse} from '../_models/game-rooms-models/response/IAcceptInviteResponse';

@Injectable({providedIn: 'root'})
export class NotificationService {
  countOfNewNotificationsSubject: BehaviorSubject<IGetNotificationNewResponse>;
  countOfNewNotifications: Observable<IGetNotificationNewResponse>;

  dataChange: BehaviorSubject<NotificationInfo[]> = new BehaviorSubject<NotificationInfo[]>([]);
  dialogData: NotificationInfo;

  constructor(private http: HttpClient,
              private userService: UserService,
              private alertService: AlertService) {
    this.countOfNewNotificationsSubject = new BehaviorSubject<IGetNotificationNewResponse>({countOfNotifications: 0});
    this.countOfNewNotifications = this.countOfNewNotificationsSubject.asObservable();
  }

  get data(): NotificationInfo[] {
    return this.dataChange.value;
  }

  getAllNotifications() {
    setTimeout(() => {
      let ELEMENT_DATA: NotificationInfo[] = [
        {
          idOfInvite: '5',
          idOfRoom: 3,
          nameOfRoom: 'fdsfs',
          idOfAdmin: 9,
          usernameOfAdmin: 'dsf',
          emailOfAdmin: 'kek@mail.ru',
          countOfPlayers: 5,
          heightOfMapForGame: 10,
          widthOfMapForGame: 10
        }

      ];
      this.dataChange.next(ELEMENT_DATA);
    }, 400);

    // this.http.get<IGetAllNotificationsResponse>(`${environment.apiUrl}notification`).subscribe(data => {
    //     this.dataChange.next(data.invite);
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log (error.name + ' ' + error.message);
    //   });
  }


  getDialogData() {
    console.log(this.dialogData);
    return this.dialogData;
  }

  public getNewNotifications() {
    setTimeout(() => {
      // this.http.get<IGetNotificationNewResponse>(`${environment.apiUrl}notification-new`).pipe(map(data => {
      //     if (data.countOfNotifications !== this.countOfNewNotificationsSubject.value.countOfNotifications) {
      //     this.countOfNewNotificationsSubject.next(data);
      //     }
      // }
      //   ));

      this.countOfNewNotificationsSubject.next({countOfNotifications: 3});
    }, 6000);

    setTimeout(() => {
      // this.http.get<IGetNotificationNewResponse>(`${environment.apiUrl}notification-new`).pipe(map(data => {
      //     if (data.countOfNotifications !== this.countOfNewNotificationsSubject.value.countOfNotifications) {
      //     this.countOfNewNotificationsSubject.next(data);
      //     }
      // }
      //   ));

      this.countOfNewNotificationsSubject.next({countOfNotifications: 15});
    }, 12000);

    setTimeout(() => {
      // this.http.get<IGetNotificationNewResponse>(`${environment.apiUrl}notification-new`).pipe(map(data => {
      //     if (data.countOfNotifications !== this.countOfNewNotificationsSubject.value.countOfNotifications) {
      //     this.countOfNewNotificationsSubject.next(data);
      //     }
      // }
      //   ));

      this.countOfNewNotificationsSubject.next({countOfNotifications: -15});
    }, 15000);

  }

  acceptInvite(idOfRoom: string): Observable<IAcceptInviteResponse> {
    const usernameOfCurrentUser = this.userService.currentUserValue.username;
    return this.http
      .post<IAcceptInviteResponse>(`${environment.apiUrl}accept-invite`,
        {username: usernameOfCurrentUser, idOfInvite: idOfRoom});
  }


  deleteInvite(idOfInvite: string) {
    // const usernameOfCurrentUser = this.userService.currentUserValue.username;
    // this.http.delete<IDeletedInvitedUserResponse>(`${environment.apiUrl}invite-user`,
    //   {
    //     params: new HttpParams()
    //       .set('username', `${usernameOfCurrentUser}`)
    //       .set('idOfInvite', `${idOfInvite}`)
    //   }).subscribe((data) => {
    //     this.alertService.success('Notification was removed');
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.alertService.error('Notification was not removed. Details: ' + err.name + ' ' + err.message);
    //   }
    // );
  }
}

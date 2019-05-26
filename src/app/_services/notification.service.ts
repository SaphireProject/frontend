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
import {AllNotificationModel} from '../_models/game-rooms-models/AllNotificationModel';

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
    setTimeout(() => {
      this.http.get<IGetAllNotificationsResponse>(`${environment.apiUrl2}notification`).subscribe(data => {
          console.log('all notif resp');
          console.log(data);
          console.log(data.invite);
          this.dataChange.next(data.invite);
        },
        (error: HttpErrorResponse) => {
          console.log('ERRRRRRARRRRR');
          console.log(error);
          this.alertService.error('Oops, something goes wrong. Please, try later');
        });
    }, 400);
  }



  getDialogData() {
    console.log(this.dialogData);
    return this.dialogData;
  }

  public getNewNotifications() {
    // setTimeout(() => {
      setInterval(() => {
        console.log('Getting Some New notification');
      this.http.get<IGetNotificationNewResponse>(`${environment.apiUrl2}notification-new`).subscribe(data => {
          console.log('New count of notification' + data.countOfNotifications);
          if (data.countOfNotifications !== this.countOfNewNotificationsSubject.value.countOfNotifications) {
          this.countOfNewNotificationsSubject.next(data);
          }
      }, error => console.log(error)
        );
      }, 6000);

    //   this.countOfNewNotificationsSubject.next({countOfNotifications: 3});
    // }, 6000);
    //
    // setTimeout(() => {
    //   // this.http.get<IGetNotificationNewResponse>(`${environment.apiUrl}notification-new`).pipe(map(data => {
    //   //     if (data.countOfNotifications !== this.countOfNewNotificationsSubject.value.countOfNotifications) {
    //   //     this.countOfNewNotificationsSubject.next(data);
    //   //     }
    //   // }
    //   //   ));
    //
    //   this.countOfNewNotificationsSubject.next({countOfNotifications: 15});
    // }, 12000);
    //
    // setTimeout(() => {
    //   // this.http.get<IGetNotificationNewResponse>(`${environment.apiUrl}notification-new`).pipe(map(data => {
    //   //     if (data.countOfNotifications !== this.countOfNewNotificationsSubject.value.countOfNotifications) {
    //   //     this.countOfNewNotificationsSubject.next(data);
    //   //     }
    //   // }
    //   //   ));
    //
    //   this.countOfNewNotificationsSubject.next({countOfNotifications: -15});
    // }, 15000);

  }

  acceptInvite(idOfInvite: string): Observable<IAcceptInviteResponse> {
    const usernameOfCurrentUser = this.userService.currentUserValue.username;

    return this.http
      .post<IAcceptInviteResponse>(`${environment.apiUrl2}accept-invite`,
        {username: usernameOfCurrentUser, idOfInvite: idOfInvite});
  }


  deleteInvite(idOfInvite: string) {
    const usernameOfCurrentUser = this.userService.currentUserValue.username;
    this.http.delete<IDeletedInvitedUserResponse>(`${environment.apiUrl2}invite-user`,
      {
        params: new HttpParams()
          .set('username', `${usernameOfCurrentUser}`)
          .set('idOfInvite', `${idOfInvite}`)
      }).subscribe((data) => {
        this.alertService.success('Notification was removed');
      },
      (err: HttpErrorResponse) => {
        this.alertService.error('Notification was not removed. Details: ' + err.name + ' ' + err.message);
      }
    );
  }
}

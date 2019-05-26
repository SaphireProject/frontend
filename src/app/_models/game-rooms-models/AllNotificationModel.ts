import {IGetAllNotificationsResponse} from './response/IGetAllNotificationsResponse';
import {InviteModel} from './response/InviteModel';

export class AllNotificationModel implements IGetAllNotificationsResponse{
  invite: [];

  constructor(userResponse: any) {
    this.invite = userResponse.invite;
  }
}

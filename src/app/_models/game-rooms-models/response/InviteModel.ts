import {NotificationInfo} from './IGetAllNotificationsResponse';

export class InviteModel implements NotificationInfo {
  countOfPlayers: number;
  emailOfAdmin: string;
  heightOfMapForGame: number;
  idOfAdmin: number;
  idOfInvite: string;
  idOfRoom: number;
  nameOfRoom: string;
  usernameOfAdmin: string;
  widthOfMapForGame: number;

}

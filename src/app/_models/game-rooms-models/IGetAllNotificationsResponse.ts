import {ICreateRoomRequest} from './ICreateRoomRequest';

export interface IGetAllNotificationsResponse {
  invite: [];
}

export interface NotificationInfo {
  idOfRoom: number;
  nameOfRoom: string;
  idOfAdmin: number;
  usernameOfAdmin: string;
  countOfPlayers: number;
  heightOfMapForGame: number;
  widthOfMapForGame: number;
}


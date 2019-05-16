export interface IGetAllNotificationsResponse {
  invite: [];
}

export interface NotificationInfo {
  idOfInvite: number;
  idOfRoom: number;
  nameOfRoom: string;
  idOfAdmin: number;
  usernameOfAdmin: string;
  countOfPlayers: number;
  heightOfMapForGame: number;
  widthOfMapForGame: number;
}


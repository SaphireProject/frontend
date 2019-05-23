export interface IGetAllNotificationsResponse {
  invite: [];
}

export interface NotificationInfo {
  idOfInvite: string;
  idOfRoom: number;
  nameOfRoom: string;
  idOfAdmin: number;
  usernameOfAdmin: string;
  emailOfAdmin: string;
  countOfPlayers: number;
  heightOfMapForGame: number;
  widthOfMapForGame: number;
}


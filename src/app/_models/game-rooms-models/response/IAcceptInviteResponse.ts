export interface IAcceptInviteResponse {
  idOfInvite: string;
  idOfRoom: number;
  nameOfRoom: string;
  idOfAdmin: number;
  usernameOfAdmin: string;
  countOfPlayers: number;
  heightOfMapForGame: number;
  widthOfMapForGame: number;
}

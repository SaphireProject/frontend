export interface ICreateRoomRequest {
  idOfAdmin: number;
  usernameOfAdmin: string;
  game: string;
  nameOfRoom: string;
  countOfPlayers: number;
  heightOfMapForGame: number;
  widthOfMapForGame: number;
  // next, if we with selecting level;
  // levelType: string; // 'tileGrass1', 'tileGrass2', 'tileSand1', 'tileSand2', 'tileSand3'
}

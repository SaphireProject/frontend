export interface IConfirmUserIsReadyToGameRequest {
  username: string;
  idOfChosenStrategy: number;
  chosenTank: string;
  // could be 'tank_green', 'tank_red', ' tank_sand', 'tank_blue', 'tank_dark'
}

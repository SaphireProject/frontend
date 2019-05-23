export interface IConfirmUserIsReadyToGameResponse {
  status: boolean;
  username: string;
  idOfChosenStrategy: number;
  idOfRoom: number;
  chosenTank: string;
  // could be 'tank_green', 'tank_red', ' tank_sand', 'tank_blue', 'tank_dark'
}

export interface IGetUserStatusResponse {
  users: [IUserStatus];
}

export interface IUserStatus {
  idOfUser: number;
  username: string;
  email: string;
  readyToPlay: boolean;
  chosenTank?: string | null;
  // could be 'tank_green', 'tank_red', ' tank_sand', 'tank_blue', 'tank_dark'
}

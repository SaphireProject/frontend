export interface IGetRoomUsersResponse {
  users: [IUserForRoom];
}

export interface IUserForRoom {
  idOfUser: number;
  username: string;
  email: string;
  chosenTank?: string | null;
  // could be 'tank_green', 'tank_red', ' tank_sand', 'tank_blue', 'tank_dark'
  readyToPlay: boolean;
}

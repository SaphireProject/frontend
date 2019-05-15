export interface ICurrentWinner {
  typeOfEnding: string;
  idOfWinner: number | undefined;
  user: IUserWinner | undefined;
}

export interface IUserWinner {
  username: string;
  email: string;
  bio: string;
}

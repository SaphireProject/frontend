export interface ISnapshotResponse {
  preload: IPreload | null;
  frames?: (IFrames)[] | null;
  endOfGame?: (IEndOfGame) | null;
}

export interface IPreload {
  blocks?: (string)[] | null;
}

export interface IFrames {
  snapshotNumber: number;
  animations: IAnimations;
}

export interface IAnimations {
  tanks?: (ITanks)[] | null;
  bullets?: (IBullets | null)[] | null;
}

export interface ITanks {
  id: string;
  positionX: number;
  positionY: number;
  color: string;
  isAlive: boolean;
}

export interface IBullets {
  positionX: number;
  positionY: number;
  bulletDirection: string;
  isFirstSnapshot: boolean;
  isLastSnapshot: boolean;
}

export interface IEndOfGame {
    typeOfEnding: string;
    idOfWinner: (IWinnerEntity)[];
}

export interface IWinnerEntity {
  id: number;
}


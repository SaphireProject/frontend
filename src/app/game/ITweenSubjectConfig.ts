import Game = Phaser.Game;

export interface ITweenSubjectConfig {
  id: number;
  positionX: number;
  positionY: number;
  type: string;
  game: Game;
  walls: any;
  yWorld: number;
}

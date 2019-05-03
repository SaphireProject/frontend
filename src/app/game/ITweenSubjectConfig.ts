import Game = Phaser.Game;

export interface ITweenSubjectConfig {
  id: string;
  positionX: number;
  positionY: number;
  type: string;
  game: Game;
}

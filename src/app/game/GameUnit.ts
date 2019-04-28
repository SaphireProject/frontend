import Sprite = Phaser.Sprite;
import Game = Phaser.Game;
import Tween = Phaser.Tween;
import {count} from 'rxjs/operators';

interface IUnitConfig {
  positionX: number;
  positionY: number;
  type: string;
  game: Game;
}

export class GameUnit {
  game: Game;
  id: string;
  positionX: number;
  positionY: number;
  type: string;
  spriteLink: Sprite;
  tweenForUnit: Tween;
  tweenCoordinatesQueue: Array<Array<number>>;

  constructor(config: IUnitConfig) {
    this.tweenCoordinatesQueue = [];
    this.positionX = config.positionX;
    this.positionY = config.positionY;
    this.type = config.type;
    this.game = config.game;
    this.spriteLink = this.generateSprite();
    this.tweenForUnit = this.game.add.tween(this.spriteLink);
    this.spriteLink.anchor.setTo(0.5, 0.5);
  }

  private generateSprite(): Sprite {
    return this.game.add.sprite(this.positionX, this.positionY, this.type);
  }


  public moveTo(newPositionX: number, newPositionY: number) {
    if (this.tweenForUnit.isRunning) {
      this.tweenCoordinatesQueue.push([newPositionX, newPositionY]);
    } else {
      this.countUnitAngle(newPositionX, newPositionY);
      this.tweenForUnit = this.game.add.tween(this.spriteLink)
        .to({x: newPositionX, y: newPositionY}, 1000, Phaser.Easing.Linear.None)
        .start();
      this.tweenForUnit.onComplete.add(() => {
        if (this.tweenCoordinatesQueue.length > 0) {
          const nextPosition = this.tweenCoordinatesQueue.shift();
          newPositionX = nextPosition.shift();
          newPositionY = nextPosition.shift();
          this.moveTo(newPositionX, newPositionY);
        }
      }, this);
    }
  }

  private countUnitAngle(newPositionX: number, newPositionY: number) {
    let currentPositionX: number;
    let currentPositionY: number;
    currentPositionX = this.spriteLink.x;
    currentPositionY = this.spriteLink.y;
    if (newPositionX > currentPositionX) {
      this.spriteLink.angle = 270;
    } else {
      if (newPositionX < currentPositionX) {
        this.spriteLink.angle = 90;
      }
    }

    if (newPositionY > currentPositionY) {
        this.spriteLink.angle = 0;
    } else {
      if (newPositionY < currentPositionY) {
        this.spriteLink.angle = 180;
      }
    }

  }


}

import Sprite = Phaser.Sprite;
import Game = Phaser.Game;
import Tween = Phaser.Tween;
import {ITweenSubjectConfig} from './ITweenSubjectConfig';


// TweenSubject - is one subject for animation from position to position
// It could be game units, bullets and other

export class TweenSubject {
  game: Game;
  id: string;
  positionX: number;
  positionY: number;
  type: string;
  spriteLink: Sprite;
  tweenAction: Tween;
  tweenCoordinatesQueue: Array<Array<number>>;

  constructor(config: ITweenSubjectConfig) {
    this.id = config.id;
    this.tweenCoordinatesQueue = [];
    this.positionX = this.convertCellToPixels(config.positionX);
    this.positionY = this.convertCellToPixels(config.positionY);
    this.type = config.type;
    this.game = config.game;
    this.spriteLink = this.generateSprite();
    this.tweenAction = this.game.add.tween(this.spriteLink);
    this.spriteLink.anchor.setTo(0.5, 0.5);
    console.log('center in Tween ' + this.game.world.centerX);
    console.log('center in Tween ' + this.game.world.centerY);
  }

  private generateSprite(): Sprite {
    return this.game.add.sprite(this.positionX, this.positionY, this.type);
  }


  public moveTor(newPositionX: number, newPositionY: number) {
    if (this.tweenAction.isRunning) {
      this.tweenCoordinatesQueue.push([newPositionX, newPositionY]);
    } else {
      this.countTweenSubjectAngle(newPositionX, newPositionY);
      this.tweenAction = this.game.add.tween(this.spriteLink)
        .to({x: newPositionX, y: newPositionY}, 500, Phaser.Easing.Linear.None)
        .start();
      this.tweenAction.onComplete.add(() => {
        if (this.tweenCoordinatesQueue.length > 0) {
          const nextPosition = this.tweenCoordinatesQueue.shift();
          newPositionX = nextPosition.shift();
          newPositionY = nextPosition.shift();
          this.moveTo(newPositionX, newPositionY);
        }
      }, this);
    }
  }

  public moveTo(newPositionX: number, newPositionY: number) {
    newPositionX = this.convertCellToPixels(newPositionX);
    newPositionY = this.convertCellToPixels(newPositionY);
    this.countTweenSubjectAngle(newPositionX, newPositionY);
    // don't make movement, if new position the same, that was
    if ((newPositionX === this.positionX) && (newPositionY === this.positionY)) {
      return;
    } else {
      this.tweenAction = this.game.add.tween(this.spriteLink)
        .to({x: newPositionX, y: newPositionY}, 500, Phaser.Easing.Linear.None)
        .start();
        this.positionX = newPositionX;
        this.positionY = newPositionY;
    }
  }

  // count angle of unit
  private countTweenSubjectAngle(newPositionX: number, newPositionY: number) {
    let currentPositionX: number;
    let currentPositionY: number;
    currentPositionX = this.positionX;
    currentPositionY = this.positionY;
    console.log('New Current X ' + newPositionX + ' ' + currentPositionX);
    console.log('New Current Y ' + newPositionY + ' ' + currentPositionY);
    if (newPositionY > currentPositionY) {
      this.spriteLink.angle = 0;
    } else {
      if (newPositionY < currentPositionY) {
        this.spriteLink.angle = 180;
      }
    }

    if (newPositionX > currentPositionX) {
      this.spriteLink.angle = 270;
    } else {
      if (newPositionX < currentPositionX) {
        this.spriteLink.angle = 90;
      }
    }
  }

  private convertCellToPixels(cellPosition: number): number {
    return cellPosition * 64 + 32;
  }


}

import {TweenSubject} from './TweenSubject';
import {ITweenSubjectConfig} from './ITweenSubjectConfig';

export class BulletTweenSubject extends TweenSubject {
  constructor(config: ITweenSubjectConfig, firstBulletDirection: string) {
    super(config);
    this.makeSmoke(config.positionX, config.positionY, firstBulletDirection);
  }

  destroy(positionX: number, positionY: number, lastBulletDirection: string): void {
    switch (lastBulletDirection) {
      case 'down':
        positionY += 0.7;
        break;
      case 'up':
        positionY -= 0.7;
        break;
      case 'left':
        positionX -= 0.7;
        break;
      case 'right':
        positionX += 0.7;
        break;
    }
      const bulletTween = this.moveTo(positionX, positionY);
      const explosion = this.game.add.sprite(this.convertCellToPixels(positionX), this.convertCellToPixels(positionY), 'explosion');
      explosion.scale.setTo(0.8, 0.8);
      explosion.animations.add('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10);
      explosion.anchor.setTo(0.5, 0.5);

    bulletTween.onComplete.add( () => {
      explosion.animations.play('explosion', 20).onComplete.add(() => {
      });
      this.spriteLink.destroy();
    });
  }

  makeSmoke(positionX: number, positionY: number, bulletDirection: string): void {
    const explosion = this.game.add.sprite(positionX * 64 + 32, positionY * 64 + 32, 'explosion');
    explosion.animations.add('explosion', [0, 1, 5, 0], 10);
    switch (bulletDirection) {
      case 'down':
        explosion.anchor.setTo(0.5, 1);
        break;
      case 'up':
        explosion.anchor.setTo(0.5, 0);
        break;
      case 'left':
        explosion.anchor.setTo(1, 0.5);
        break;
      case 'right':
        explosion.anchor.setTo(0, 0.5);
        break;
    }
    explosion.animations.play('explosion', 20);
  }
}

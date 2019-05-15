import {TweenSubject} from './TweenSubject';
import {ITweenSubjectConfig} from './ITweenSubjectConfig';

export class UnitTweenSubject extends TweenSubject {
  constructor(config: ITweenSubjectConfig) {
    super(config);
  }

  // clear unit data and play death animation
  destroy() {
    const explosion = this.game.add.sprite(this.spriteLink.x, this.spriteLink.y, 'explosion');
    explosion.animations.add('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10);
    explosion.anchor.setTo(0.5, 0.5);
    explosion.animations.play('explosion', 20);
    this.spriteLink.destroy();
  }
}

import {UnitTweenSubject} from './UnitTweenSubject';
import {BulletTweenSubject} from './BulletTweenSubject';
import test from 'src/assets/images/tanks_robo/test.json';
import Sprite = Phaser.Sprite;
import Tween = Phaser.Tween;
import Tilemap = Phaser.Tilemap;
import Tileset = Phaser.Tileset;
import TilemapLayer = Phaser.TilemapLayer;
import {MapDrawer} from './MapDrawer';

export class BattleState extends Phaser.State {


  // tween: TweenManager;
  units: UnitTweenSubject[] = [];
  bullets: BulletTweenSubject[] = [];
  tank: Sprite;
  explosion: Sprite;
  explosionAnimation: any;
  land: any;
  tweenA: Tween;
  tweenForTank: Tween;
  map: Tilemap;
  layer: TilemapLayer;
  location: Tileset;
  heightOfBackgroundTilest: number;
  widthOfBackgroundTileset: number;
  widthOfTheScreen = 1000;
  heightOfTheScreen = 1000;
  bullet: Sprite;
  weapon: Phaser.Weapon;
  fireButton: any;
  tween3: Tween;
  xTest: number;
  yTest: number;
  tweenK: Tween;
  testy: number;

  preload() {
    console.log('test in preload' + this.testy);
    this.game.load.tilemap('mapa',
      'assets/images/tanks_robo/location.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/images/tanks_robo/allSprites_default.png');
    this.game.load.image('green_bullet', 'assets/images/tanks_robo/bulletGreen2.png');
    this.game.load.image('tank_green', 'assets/images/tanks_robo/tank_green.png');
    this.game.load.image('tank_red', 'assets/images/tanks_robo/tank_red.png');
    this.game.load.image('tank_blue', 'assets/images/tanks_robo/tank_blue.png');
    this.game.load.image('tank_sand', 'assets/images/tanks_robo/tank_sand.png');
    this.game.load.image('tank_huge', 'assets/images/tanks_robo/tank_huge.png');
    this.game.load.image('tank_bigRed', 'assets/images/tanks_robo/tank_bigRed.png');
    this.game.load.image('tank_darkLarge', 'assets/images/tanks_robo/tank_darkLarge.png');
    this.game.load.image('explosion-first', 'assets/images/tanks_robo/explosion_firstshot.png');
    this.game.load.spritesheet('explosion', 'assets/images/tanks_robo/piskel.png', 65, 65);
    this.game.load.spritesheet('fireFromBullet', 'assets/images/tanks_robo/bullet_fire.png', 21, 38);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    console.log('test ' + this.testy);
  }


  create() {
   const mapDrawer = new MapDrawer(this.game);
   mapDrawer.generateMap();

    this.initUnits();
    this.makeFrameAnimation();

    this.tank = this.game.add.sprite(mapDrawer.game.world.centerX, mapDrawer.game.world.centerY, 'tank_green');
    // this.tank.anchor.setTo(0.5, 0.5); ??
    // this.bullet = this.game.add.sprite(null, null, 'green_bullet');

    // this.weapon = this.game.add.weapon(1000, 'green_bullet');
    // this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    // this.weapon.bulletSpeed = 1000;
    // this.weapon.trackSprite(this.tank, 30, 0, false);
    // this.weapon.fireAngle = 90;
    // this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    // this.game.add.tween(this.tank).from({x: +10}, 2000, Phaser.Easing.Linear.None).start();
    this.explosion = this.game.add.sprite(30, 30, 'explosion');
    this.explosion.animations.add('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10);

    let kek = this.tank.animations.add('fireFromBullet', [0, 1, 2, 3, 4], 10);
    kek = this.tank.animations.play('fireFromBullet', 20);
    this.tweenForTank = this.game.add.tween(this.tank);
    // this.weapon.addBulletAnimation('fireFromBullet', [0, 1, 2, 3], 10);
    // let unit = new GameUnit({ positionX: 50, positionY: 40, type: 'tank_green', game: this.game});
    // let unit2 = new GameUnit({ positionX: 100, positionY: 100, type: 'tank_blue', game: this.game});
    // let unit3 = new GameUnit({ positionX: 150, positionY: 350, type: 'tank_red', game: this.game});
    // let unit4 = new GameUnit({ positionX: 500, positionY: 30, type: 'tank_green', game: this.game});


    // unit2.moveTo(150, 100);
    // unit3.moveTo(150, 320);
    // unit4.moveTo(520, 30);
    //
    //  unit.moveTo(300, 90);
    //  unit2.moveTo(150, 100);
    //  unit3.moveTo(50, 320);
    //  unit4.moveTo(400, 30);
    //
    // unit.moveTo(150, 90);
    // unit2.moveTo(150, 30);
    // unit3.moveTo(50, 50);
    // unit4.moveTo(400, 80);


    // this.tweenA
    // this.tween3 = this.game.add.tween(this.tank).to({x: 80, y: 80}, 500, Phaser.Easing.Linear.None);
    // this.tween3.onStart.add(testik, this);
    // this.tween3.start();
    // let tween1;
    // let tween2 = this.game.add.tween(this.tank).to({x: 80, y: 80}, 500, Phaser.Easing.Linear.None);
    // let tween3 = this.game.add.tween(this.tank).to({x: 80, y: 100}, 500, Phaser.Easing.Linear.None);
    // let tween4 = this.game.add.tween(this.tank).to({x: 180, y: 80}, 500, Phaser.Easing.Linear.None);
    // let tween5 = this.game.add.tween(this.tank).to({x: 80, y: 50}, 500, Phaser.Easing.Linear.None);
    // let tween6 = this.game.add.tween(this.tank).to({x: 80, y: 80}, 500, Phaser.Easing.Linear.None);
    // tween2.chain(tween3, tween4, tween5, tween6);
    // tween2.start();
    // this.game.add.tween(this.tank).to({x: 80, y: 80}, 500, Phaser.Easing.Linear.None).start();
    // this.game.add.tween(this.tank).to({x: 80, y: 120}, 500, Phaser.Easing.Linear.None).start();
    // this.game.add.tween(this.tank).to({x: 80, y: 80}, 500, Phaser.Easing.Linear.None).start();


    // this.differenceBetweenHeightOfScreenAndTilemap = this.heightOfBackgroundTilest / this.game.height;
    // console.log(this.differenceBetweenHeightOfScreenAndTilemap);
    // this.scale.setGameSize(1000, 1000);
    // this.game.world.scale.setTo(25, 25);
    // this.layer.resizeWorld();
    // this.game.world.scale.set(1, 1);

  }

  private initUnits() {
    // generating units
    for (const unit of test.frames[0].animations.tanks) {
      const unitId = unit.id,
        color = unit.color,
        positionX = unit.positionX,
        positionY = unit.positionY;
      this.units.push(new UnitTweenSubject({id: unitId, positionX: positionX, positionY: positionY, type: color, game: this.game}));
    }

    // generating bullets
    for (const bullet of test.frames[0].animations.bullets) {
      const positionX = bullet.positionX,
        positionY = bullet.positionY,
        colorBullet = 'green_bullet';
      this.bullets.push(new BulletTweenSubject({id: undefined, positionX: positionX, positionY: positionY, type: colorBullet, game: this.game}));
    }
  }

  private makeFrameAnimation() {
    let numberOfCurrentSnapshot = 0;
    // actions, that do every frame
    setInterval(() => {
      if (numberOfCurrentSnapshot < test.frames.length) {
        // making movement for every unit in one snapshot
        this.processAllItemsInSnapshot(numberOfCurrentSnapshot);
        // clear destroyed units from array of units
        this.clearEmptyData();
        numberOfCurrentSnapshot++;
      } else {
        // end SetInterval after all snapshots
        return;
      }
    }, 500);

    //
    // for (let frame of test.frames) {
    //   // actions, that do with ever unit
    //   // frame.animations.tanks.forEach((unitSpecifications, i) => {
    //   let index = 0;
    //   for (const unitSpecifications of frame.animations.tanks) {
    //     let testik = this.makeMovement(unitSpecifications, index);
    //     index++;
    //   }
    //   // clear destroyed units from array of units
    //   this.units = this.units.filter((unitSpecifications) => {
    //       return unitSpecifications != null;
    //     }
    //   );
    //
    //   console.log('check check ');
    //   console.log(this.units);
    //   alert('Test ' + frame);
    // }
  }

  private processAllItemsInSnapshot(numberOfCurrentSnapshot: number) {
    let numberOfUnit = 0;
    for (const unitSpecifications of test.frames[numberOfCurrentSnapshot].animations.tanks) {
      this.makeUnitMovement(unitSpecifications, numberOfUnit);
      numberOfUnit++;
    }

    let numberOfBullet = 0;
    for (const bulletSpecifications of test.frames[numberOfCurrentSnapshot].animations.bullets) {
      this.makeBulletMovement(bulletSpecifications, numberOfBullet);
      numberOfBullet++;
    }
  }

  private makeUnitMovement(unitSpecifications: any, index: number) {
    const positionX = unitSpecifications.positionX;
    const positionY = unitSpecifications.positionY;
    console.log('test ' + unitSpecifications.positionX);
    console.log('test ' + unitSpecifications.positionY);
    // check unit is alive and making move,ent
    if (unitSpecifications.isAlive) {
      this.units[index].moveTo(positionX, positionY);
    } else {
      // destroy sprite, play animation and clear element of array
      console.log('LOOOSER');
      this.units[index].destroy();
      this.units[index] = null;
    }
  }

  private makeBulletMovement(unitSpecifications: any, index: number) {
    const positionX = unitSpecifications.positionX;
    const positionY = unitSpecifications.positionY;
    const colorBullet = 'green_bullet';
    console.log(unitSpecifications);
    console.log('test ' + unitSpecifications.positionX);
    console.log('test ' + unitSpecifications.positionY);
    // check unit is alive and making move,ent
    if (unitSpecifications.isFirstSnapshot) {
      console.log('isFirsSnap in');
      this.bullets.push(new BulletTweenSubject({
        id: undefined,
        positionX: positionX,
        positionY: positionY,
        type: colorBullet,
        game: this.game
      }));
    } else {
      if (unitSpecifications.isLastSnapshot) {
        console.log('isLastSnap in');
        this.bullets[index].destroy();
        this.bullets[index] = null;
      } else {
        console.log('isMoveto in');
        console.log('index ' + index);
        console.log(this.bullets[index]);
        this.bullets[index].moveTo(positionX, positionY);
      }
    }
  }

  private clearEmptyData() {
    this.units = this.units.filter((unitSpecifications) => {
        return unitSpecifications != null;
      }
    );

    this.bullets = this.bullets.filter((bulletSpecifications) => {
        return bulletSpecifications != null;
      }
    );
  }

  update() {
    //  if (!this.tweenForTank.isRunning) {
    //  if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    //    console.log('down');
    //    this.tank.angle = 0;
    //    this.weapon.fireAngle = 90;
    //    this.weapon.trackSprite(this.tank, 0, +40, false);
    //    this.tweenForTank = this.game.add.tween(this.tank).to({y: this.tank.y + 40}, 500, Phaser.Easing.Linear.None).start();
    //  }
    //  if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    //    this.tank.angle = 180;
    //    this.weapon.fireAngle = 270;
    //    this.weapon.trackSprite(this.tank, 0, -40, false);
    //    this.tweenForTank = this.game.add.tween(this.tank).to({y: this.tank.y - 40}, 500, Phaser.Easing.Linear.None).start();
    //    console.log('up');
    //  }
    //  if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    //    this.tank.angle = 90;
    //    this.weapon.fireAngle = 180;
    //    this.weapon.trackSprite(this.tank, -30, 0, false);
    //    this.tweenForTank = this.game.add.tween(this.tank).to({x: this.tank.x - 40}, 500, Phaser.Easing.Linear.None).start();
    //    console.log('left');
    //  }
    //  if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    //    this.tank.angle = 270;
    //    this.weapon.fireAngle = 0;
    //    this.weapon.trackSprite(this.tank, 30, 0, false);
    //    this.tweenForTank = this.game.add.tween(this.tank).to({x: this.tank.x + 40}, 500, Phaser.Easing.Linear.None).start();
    //     console.log('right');
    //  }
    // }
    //  if (this.fireButton.isDown) {
    //    this.weapon.setBulletBodyOffset(undefined, undefined, 3000, 0);
    //    this.weapon.fire();
    //  }
    //  if (this.game.input.keyboard.isDown(Phaser.Keyboard.F)) {
    //    this.explosion.animations.play('explosion', 20);
    //  }
  }

  tweenObject() {

  }

  render() {
    this.game.renderer.resize(640, 640);
  }

}

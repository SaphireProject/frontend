import {GameUnit} from './GameUnit';
import test from 'src/assets/images/tanks_robo/test.json';
import Sprite = Phaser.Sprite;
import Tween = Phaser.Tween;
import Tilemap = Phaser.Tilemap;
import Tileset = Phaser.Tileset;
import TilemapLayer = Phaser.TilemapLayer;

export class BattleState extends Phaser.State {

  units: number[] = [];
  // tween: TweenManager;
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
    console.log('test in create' + this.testy);
    // initUnits();
    console.log('test in create' + this.testy);
    this.game.world.setBounds(0, 0, 1000, 1000);
    this.map = this.game.add.tilemap('mapa');
    // this.map.setTileSize( 80, 80);
    this.location = this.map.addTilesetImage('allSprites_default', 'tiles');
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    // this.map.setCollision(); - для того, чтобы настроить ограничения
    // for (let unit of test.frames[0].animations.tanks) {
    //   const unitId = unit.id;
    //   console.log(unitId);
    //   const color = unit.color;
    //   console.log(color);
    //   const positionX = unit.positionX;
    //   console.log(positionX);
    //   const positionY = unit.positionY;
    //   console.log(positionY);
    //   this.units.push(new GameUnit({id: unitId, positionX: positionX, positionY: positionY, type: color, game: this.game}));
    // }
    this.tank = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY,  'tank_green');
    // this.tank.anchor.setTo(0.5, 0.5); ??
    this.bullet = this.game.add.sprite(null, null, 'green_bullet');
    this.heightOfBackgroundTilest = this.map.heightInPixels;
    this.widthOfBackgroundTileset = this.map.widthInPixels;
    this.weapon = this.game.add.weapon(1000, 'green_bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 1000;
    let newArray: GameUnit[];
    newArray = [];
    // this.units.push(new GameUnit({id: '2', positionX: 23, positionY: 34, type: 'tank_green', game: this.game}));
    // let l = new GameUnit({id: '2', positionX: 23, positionY: 34, type: 'tank_green', game: this.game})
    // this.units.unshift(l);
    this.weapon.trackSprite(this.tank, 30, 0, false);
    this.weapon.fireAngle = 90;
    this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    // this.game.add.tween(this.tank).from({x: +10}, 2000, Phaser.Easing.Linear.None).start();
    this.explosion = this.game.add.sprite(30, 30, 'explosion');
    this.explosion.animations.add('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10);

    let kek = this.tank.animations.add('fireFromBullet', [0, 1, 2, 3, 4], 10);
    kek = this.tank.animations.play('fireFromBullet', 20);
    this.tweenForTank = this.game.add.tween(this.tank);
    this.weapon.addBulletAnimation('fireFromBullet', [0, 1, 2, 3], 10);
    this.units.push(1);
    console.log(this.units);
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

    for (let i = 0; i < test.frames.length; i++) {
      // unit.moveTo(test.frames[i].animations.tanks[0].positionX, test.frames[i].animations.tanks[0].positionY);
      console.log(i);
      console.log('x ' + test.frames[i].animations.tanks[0].positionX);
      console.log('y ' + test.frames[i].animations.tanks[0].positionY);
    }

    function initUnits() {
      this.units.push(1);
      console.log(this.units);
    }


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

    console.log(this.game.width);
    console.log(this.heightOfBackgroundTilest);
    // this.differenceBetweenHeightOfScreenAndTilemap = this.heightOfBackgroundTilest / this.game.height;
    // console.log(this.differenceBetweenHeightOfScreenAndTilemap);
    // this.scale.setGameSize(1000, 1000);
    // this.game.world.scale.setTo(25, 25);
    // this.layer.resizeWorld();
    // this.game.world.scale.set(1, 1);

    function testik() {
      return console.log('Testik');
    }
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

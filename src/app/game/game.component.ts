import { Component, OnInit } from '@angular/core';
import { Game, AUTO, TweenManager } from 'phaser-ce';
import Tween = Phaser.Tween;
import World = Phaser.World;
import Tileset = Phaser.Tileset;
import TilemapLayer = Phaser.TilemapLayer;
import Tilemap = Phaser.Tilemap;
import ScaleManager = Phaser.ScaleManager;
import Sprite = Phaser.Sprite;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
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

  constructor() {
  this.game = new Game(this.widthOfTheScreen, this.heightOfTheScreen, AUTO, '', { preload: this.preload, create: this.create, render: this.render, update: this.update}, undefined, false);
  }



  preload() {
    this.game.load.tilemap('mapa',
      'assets/images/tanks_robo/Robotanks3.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/images/tanks_robo/allSprites_default.png');
    this.game.load.image('green_bullet', 'assets/images/tanks_robo/bulletGreen2.png');
    this.game.load.image('tank', 'assets/images/tanks_robo/tank_green.png');
    this.game.load.image('explosion-first', 'assets/images/tanks_robo/explosion_firstshot.png');
    this.game.load.spritesheet('explosion', 'assets/images/tanks_robo/piskel.png', 65, 65);
     this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
     this.game.scale.pageAlignHorizontally = true;
     this.game.scale.pageAlignVertically = true;
  }


  create() {
   this.game.world.setBounds(0, 0, 1000, 1000);
    this.map = this.game.add.tilemap('mapa');
    // this.map.setTileSize( 80, 80);
    this.location = this.map.addTilesetImage('allSprites_default', 'tiles');
    this.layer = this.map.createLayer('Background');
    // this.layer.resizeWorld();
    // this.map.setCollision(); - для того, чтобы настроить ограничения
    this.tank = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY,  'tank');
    this.tank.anchor.setTo(0.5, 0.5);
    this.bullet = this.game.add.sprite(null, null, 'green_bullet');
    this.heightOfBackgroundTilest = this.map.heightInPixels;
    this.widthOfBackgroundTileset = this.map.widthInPixels;
    this.weapon = this.game.add.weapon(1000, 'green_bullet');
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.weapon.bulletSpeed = 1000;
    this.weapon.trackSprite(this.tank, 30, 0, false);
    this.weapon.fireAngle = 90;
    this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    this.game.add.tween(this.tank).from({x: +10}, 2000, Phaser.Easing.Linear.None).start();
    this.explosion = this.game.add.sprite(30, 30, 'explosion');
    this.explosion.animations.add('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10);
    this.tweenForTank = this.game.add.tween(this.tank);

    // const scaler = 15;
    // const boundsvar = this.bounds;
    // const cameraBounds = this.game.camera.bounds;
    // cameraBounds.x = boundsvar.width * (1 - scaler) / 2;
    // cameraBounds.y = boundsvar.height * (1 - scaler) / 2;
    // cameraBounds.width = boundsvar.width * scaler;
    // cameraBounds.height = boundsvar.height * scaler;

    // this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    // this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    // this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    // this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


    // this.tank.anchor.setTo(0.5, 0.5);
    // this.tweenA = this.game.add.tween(this.tank).to({x: 200}, 2000, Phaser.Easing.Linear.None).to({y: 200}, 2000, Phaser.Easing.Linear.None);
    // this.tweenA.start();/**/
    // this.game.world.camera.setSize(1000, 1000);
    // this.map.getTile(5, 5).centerX = this.world.centerX;
    // this.map.getTile(5, 5).centerY = this.world.centerY;
   // this.map.getTile(4, 4).worldY = this.world.centerY;
   // //this.layer.fixedToCamera = false;
    // console.log('Попытка узнать высоту' + this.location.tileHeight + ' ' + this.layer.collisionHeight + ' ' + this.map.heightInPixels);
    console.log(this.game.width);
    console.log(this.heightOfBackgroundTilest);
    // this.differenceBetweenHeightOfScreenAndTilemap = this.heightOfBackgroundTilest / this.game.height;
    // console.log(this.differenceBetweenHeightOfScreenAndTilemap);
    // this.scale.setGameSize(1000, 1000);
    // this.game.world.scale.setTo(25, 25);
    // this.layer.resizeWorld();

    // this.land = this.game.add.tileSprite(0, 0, 800, 600, 'earth');
    // this.land.fixedToCamera = true;

   // this.tank = this.game.add.sprite(0, 0, 'tank', 'tank1');
   // // this.tank.anchor.setTo(0.5, 0.5);
   // //  this.turret = this.game.add.sprite(0, 0, 'tank', 'turret');
   // //  this.turret.anchor.setTo(0.3, 0.5);
   //  this.tweenA = this.game.add.tween(this.tank).to( {x: 600}, 20000, 'Quart.easeOut');
   //  // this.tweenA.onComplete.add( this.firstTween, this);
   //  this.tweenA.start();
   //  // this.tweenB = this.game.add.tween(this.tank).to( {y: 600}, 20000, 'Quart.easeOut');


    // this.game.world.scale.set(1, 1);

  }

  update() {
    if (!this.tweenForTank.isRunning) {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      console.log('down');
      this.tank.angle = 0;
      this.weapon.fireAngle = 90;
      this.weapon.trackSprite(this.tank, 0, +40, false);
      this.tweenForTank = this.game.add.tween(this.tank).to({y: this.tank.y + 40}, 1000, Phaser.Easing.Linear.None).start();
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.tank.angle = 180;
      this.weapon.fireAngle = 270;
      this.weapon.trackSprite(this.tank, 0, -40, false);
      this.tweenForTank = this.game.add.tween(this.tank).to({y: this.tank.y - 40}, 1000, Phaser.Easing.Linear.None).start();
      console.log('up');
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.tank.angle = 90;
      this.weapon.fireAngle = 180;
      this.weapon.trackSprite(this.tank, -30, 0, false);
      this.tweenForTank = this.game.add.tween(this.tank).to({x: this.tank.x - 40}, 1000, Phaser.Easing.Linear.None).start();
      console.log('left');
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.tank.angle = 270;
      this.weapon.fireAngle = 0;
      this.weapon.trackSprite(this.tank, 30, 0, false);
      this.tweenForTank = this.game.add.tween(this.tank).to({x: this.tank.x + 40}, 1000, Phaser.Easing.Linear.None).start();
       console.log('right');
    }
   }
    if (this.fireButton.isDown) {
      this.weapon.setBulletBodyOffset(undefined, undefined, 3000, 0);
      this.weapon.fire();
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.F)) {
      this.explosion.animations.play('explosion', 20);
    }
  }

  render() {
    // this.game.renderer.resize(2000, 2000);
  }

  ngOnInit() {
  }

}

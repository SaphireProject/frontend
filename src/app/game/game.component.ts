import { Component, OnInit } from '@angular/core';
import { Game, AUTO, TweenManager } from 'phaser-ce';
import Tween = Phaser.Tween;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
  // tween: TweenManager;
  tank: any;
  turret: any;
  land: any;
  tweenA: Tween;
  map: any;
  layer: any;
  scale: any;

  constructor() {
    this.game = new Game(1200, 1200, AUTO, '', { preload: this.preload, create: this.create });
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.scale.pageAlignHorizontally = true;
    // this.scale.pageAlignVertically = true;
  }


  preload() {
    const pixelWidth = 6;
    const pixelHeight = 6;

    let chick = [
      '...55.......',
      '.....5......',
      '...7888887..',
      '..788888887.',
      '..888088808.',
      '..888886666.',
      '..8888644444',
      '..8888645555',
      '888888644444',
      '88788776555.',
      '78788788876.',
      '56655677776.',
      '456777777654',
      '.4........4.'
  ];
      this.game.load.atlas('tank', 'assets/images/tanks/tanks.png', 'assets/images/tanks/tanks.json');
    this.game.load.image('earth', 'assets/images/tanks/scorched_earth.png');
    this.game.load.tilemap('mapa',
      'assets/images/tanks_robo/Robotanks3.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/images/tanks_robo/allSprites_default.png');
  }


  create() {
    this.game.world.setBounds(0, 0, 1200, 1200);
   this.map = this.game.add.tilemap('mapa');
    this.map.addTilesetImage('allSprites_default', 'tiles');
    this.layer = this.map.createLayer('Background');
    // this.layer.scale.set(0.25);
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


  }



  ngOnInit() {
  }

}

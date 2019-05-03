import { Component, OnInit } from '@angular/core';
import { Game, AUTO, TweenManager } from 'phaser-ce';
import Tween = Phaser.Tween;
import World = Phaser.World;
import Tileset = Phaser.Tileset;
import TilemapLayer = Phaser.TilemapLayer;
import Tilemap = Phaser.Tilemap;
import ScaleManager = Phaser.ScaleManager;
import Sprite = Phaser.Sprite;
import test from 'src/assets/images/tanks_robo/test.json';
import {BattleState} from './BattleState';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
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

  constructor() {
  this.game = new Game(this.widthOfTheScreen, this.heightOfTheScreen, AUTO, '');
    this.game.state.add('BattleState', BattleState);
    this.testy = 3;
    console.log('test in constr' + this.testy);
    this.game.state.start('BattleState');
  }

  ngOnInit() {
  }

}

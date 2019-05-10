import {Component, OnDestroy, OnInit} from '@angular/core';
import { Game, AUTO, TweenManager } from 'phaser-ce';
import Tween = Phaser.Tween;
import World = Phaser.World;
import Tileset = Phaser.Tileset;
import TilemapLayer = Phaser.TilemapLayer;
import Tilemap = Phaser.Tilemap;
import ScaleManager = Phaser.ScaleManager;
import Sprite = Phaser.Sprite;
import {BattleState} from './BattleState';
import {SnapshotService} from './snapshot.service';
import test from 'src/assets/images/tanks_robo/test.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

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

  constructor(private snapshotService: SnapshotService) {
  }

  ngOnInit() {
  this.game = new Game(this.widthOfTheScreen, this.heightOfTheScreen, AUTO, 'gameDIV');
    this.game.state.add('BattleState', new BattleState(this.snapshotService));
    this.game.state.start('BattleState');
    setInterval(() => {
      this.snapshotService.sendSnapshots(test);
    }, 150);
  }

  ngOnDestroy() {
    this.game.state.destroy();
    this.game.destroy();
  }

}

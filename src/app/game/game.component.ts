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
import {ComponentCanDeactivate} from '../_guards';
import {Router} from '@angular/router';
import {UserService} from '../_services';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

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
  battleState: BattleState;

  constructor(private snapshotService: SnapshotService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
  this.battleState = new BattleState(this.snapshotService, this.router, this.userService);
  this.game = new Game(this.widthOfTheScreen, this.heightOfTheScreen, AUTO, 'gameDIV');
    this.game.state.add('BattleState', this.battleState);
    this.game.state.start('BattleState');
    setInterval(() => {
      this.snapshotService.sendSnapshots(test);
    }, 150);
  }

  ngOnDestroy() {
    this.game.state.destroy();
    this.game.destroy();
    this.battleState.stopGameElements();
  }

  fullScreenByClick() {
    this.game.scale.startFullScreen();
  }

  canDeactivate() {
    if (this.battleState.acceptToReroutePage === false) {
    return confirm('Are you sure to exit in current game?');
    } else {
      return true;
    }
  }

  repeatGame() {
    const confirmReload = confirm('Are you want repeat the current game?');
    if (confirmReload) {
    localStorage.removeItem('currentSnapshotNumber');
    location.reload();
    }
  }
}

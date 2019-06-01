import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game, AUTO} from 'phaser-ce';
import TilemapLayer = Phaser.TilemapLayer;
import Tilemap = Phaser.Tilemap;
import Sprite = Phaser.Sprite;
import {BattleState} from './BattleState';
import {SnapshotService} from './snapshot.service';
import test from 'src/assets/images/tanks_robo/test.json';
import {ComponentCanDeactivate} from '../_guards';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_services';
import { Subscription} from 'rxjs';
import {ISnapshotResponse} from './ISnapshotResponse';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  game: Game;
  explosion: Sprite;
  map: Tilemap;
  layer: TilemapLayer;
  widthOfTheScreen = 1000;
  heightOfTheScreen = 1000;
  battleState: BattleState;
  waiterForWinner: Subscription;
  acceptToSkipGame = false;
  firstPullOfSnapshots: ISnapshotResponse;
  idOfRoom: number;

  constructor(private route: ActivatedRoute,
              private snapshotService: SnapshotService,
              private router: Router,
              private userService: UserService) {
    this.waiterForWinner = this.userService.currentWinner.subscribe(() => {
      this.acceptToSkipGame = true;
      console.log('constructor game comp');
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('params');
      console.log(params);
      this.idOfRoom = +params['idOfRoom']; // (+) converts string 'id' to a number ???
      console.log('idOfRoom in game' + this.idOfRoom);
    });
    this.firstPullOfSnapshots = this.route.snapshot.data.game;
    console.log('FirstPullOfSnapshots');
    console.log(this.firstPullOfSnapshots);
    this.battleState = new BattleState(this.snapshotService, this.router, this.userService, this.firstPullOfSnapshots, this.idOfRoom);
    this.game = new Game(this.widthOfTheScreen, this.heightOfTheScreen, AUTO, 'gameDIV');
    this.game.state.add('BattleState', this.battleState);
    this.game.state.start('BattleState');
    // setInterval(() => {
    //   this.snapshotService.sendSnapshots(test);
    // }, 150);
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

  skipGame() {
    const confirmReload = confirm('Are you want skip the current game?');
    if (confirmReload) {
      localStorage.removeItem('currentSnapshotNumber');
      clearInterval(this.battleState.intervalForAnimation);
      if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
      }
      if (this.battleState.subscribingForWinner$) {
        this.battleState.subscribingForWinner$.unsubscribe();
      }
      this.battleState.acceptToReroutePage = true;
      this.router.navigate(['/endgame']);
    }
  }
}

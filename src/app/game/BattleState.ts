import {UnitTweenSubject} from './UnitTweenSubject';
import {BulletTweenSubject} from './BulletTweenSubject';
import Sprite = Phaser.Sprite;
import Tilemap = Phaser.Tilemap;
import TilemapLayer = Phaser.TilemapLayer;
import {MapDrawer} from './MapDrawer';
import {SnapshotService} from './snapshot.service';
import {UserService} from '../_services';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {ISnapshotResponse, IPreload, IBullets, ITanks, IFrames, IEndOfGame} from './ISnapshotResponse';
import {Router} from '@angular/router';

export class BattleState extends Phaser.State {

  // tween: TweenManager;
  units: UnitTweenSubject[] = [];
  bullets: BulletTweenSubject[] = [];
  // tank: Sprite;
  explosion: Sprite;
  map: Tilemap;
  layer: TilemapLayer;
  // heightOfBackgroundTilest: number;
  // widthOfBackgroundTileset: number;
  // widthOfTheScreen = 1000;
  // heightOfTheScreen = 1000;
  // bullet: Sprite;
  // weapon: Phaser.Weapon;
  // fireButton: any;
  mapDrawer: MapDrawer;
  snapshots: any[] = [];
  snapshotService: SnapshotService;
  userService: UserService;
  intervalForAnimation: any;
  intervalForRequestingData: any;
  // subscribingForSnapshotMessages$: Subscription;
  // subscribingForMap$: Subscription;
  subscribingForWinner$: Subscription;
  // subscribingForSnapshotsFromServer: Subscription;
  initInfo: any;
  router: Router;
  acceptToReroutePage = false;
  numberOfCurrentGetSnapshot: number;
  countOfGettedSnapshot: number;
  idOfRoom: number;

  constructor(snapshotService: SnapshotService,
              router: Router, userService: UserService,
              firstPullOfSnapshots: ISnapshotResponse,
              idOfRoom: number) {
    super();
    console.log('In Battle State');
    this.snapshotService = snapshotService;
    this.router = router;
    this.userService = userService;
    this.idOfRoom = idOfRoom;
    console.log('id of room in battle state' + this.idOfRoom);
    this.initInfo = firstPullOfSnapshots.preload;
    this.numberOfCurrentGetSnapshot = firstPullOfSnapshots.frames.length;
    console.log('saving current snap' + this.numberOfCurrentGetSnapshot);
    this.countOfGettedSnapshot = this.snapshotService.getCountOfRequestingSnapshots();
    this.addSnapshotsInStorage(firstPullOfSnapshots);
    if (firstPullOfSnapshots.endOfGame !== null) {
      this.toEndGame(firstPullOfSnapshots.endOfGame);
    }
    this.checkNewSnapshotsFromServer();

    // this.subscribingForMap$ = this.snapshotService.currentMessage
    //   .pipe(first())
    //   .subscribe((response: ISnapshotResponse) => {
    //     this.initInfo = response.preload;
    //   });

    // this.subscribingForSnapshotMessages$ = this.snapshotService.currentMessage.subscribe((response: ISnapshotResponse) => {
    //   console.log('this.subscribingForSnapshotMessages$ = this.snapshotService.currentMessage
    //                                        .subscribe((response: ISnapshotResponse) => {');
    //   console.log(response);
    //   this.addSnapshotsInStorage(response);
    //   if (response.endOfGame !== undefined) {
    //     this.toEndGame(response.endOfGame);
    //     console.log('this.toEndGame(response.endOfGame);');
    //   }
    // });
  }


  preload() {
    this.game.load.tilemap('mapa',
      'assets/images/tanks_robo/location.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', 'assets/images/tanks_robo/allSprites_default.png');
    this.game.load.image('green_bullet', 'assets/images/tanks_robo/bulletGreen2.png');
    this.game.load.image('tank_green', 'assets/images/tanks_robo/tank_green2.png');
    this.game.load.image('tank_red', 'assets/images/tanks_robo/tank_red.png');
    this.game.load.image('tank_blue', 'assets/images/tanks_robo/tank_blue.png');
    this.game.load.image('tank_sand', 'assets/images/tanks_robo/tank_sand.png');
    this.game.load.image('tank_huge', 'assets/images/tanks_robo/tank_huge.png');
    this.game.load.image('tank_bigRed', 'assets/images/tanks_robo/tank_bigRed.png');
    this.game.load.image('tank_darkLarge', 'assets/images/tanks_robo/tank_darkLarge.png');
    this.game.load.image('explosion-first', 'assets/images/tanks_robo/explosion_firstshot.png');
    this.game.load.image('barricadeMetal', 'assets/images/tanks_robo/barricadeMetal.png');
    this.game.load.image('barricadeWood', 'assets/images/tanks_robo/barricadeWood.png');
    this.game.load.image('crateMetal', 'assets/images/tanks_robo/crateMetal.png');
    this.game.load.image('crateWood', 'assets/images/tanks_robo/crateWood.png');
    this.game.load.image('tileGrass1', 'assets/images/tanks_robo/tileGrass1.png');
    this.game.load.image('tileGrass2', 'assets/images/tanks_robo/tileGrass2.png');
    this.game.load.image('tileSand1', 'assets/images/tanks_robo/tileSand1.png');
    this.game.load.image('tileSand2', 'assets/images/tanks_robo/tileSand2.png');
    this.game.load.image('tileSand3', 'assets/images/tanks_robo/tileSand3.png');
    this.game.load.spritesheet('explosion', 'assets/images/tanks_robo/piskel.png', 65, 65);
    this.game.load.spritesheet('fireFromBullet', 'assets/images/tanks_robo/bullet_fire.png', 21, 38);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
  }

  create() {
    console.log('in create');
    document.getElementById('fullScreenTurn');
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.input.onDown.add(this.gofull, this);
    this.initMap(this.initInfo);
    this.initUnits();
    this.makeFrameAnimation();

    // this.tank = this.game.add.sprite(mapDrawer.game.world.centerX, mapDrawer.game.world.centerY, 'tank_green');
    // this.tank.anchor.setTo(0.5, 0.5); ??
    // this.bullet = this.game.add.sprite(null, null, 'green_bullet');

    // this.weapon = this.game.add.weapon(1000, 'green_bullet');
    // this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    // this.weapon.bulletSpeed = 1000;
    // this.weapon.trackSprite(this.tank, 30, 0, false);
    // this.weapon.fireAngle = 90;
    // this.fireButton = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    // this.game.add.tween(this.tank).from({x: +10}, 2000, Phaser.Easing.Linear.None).start();

    // let kek = this.tank.animations.add('fireFromBullet', [0, 1, 2, 3, 4], 10);
    // kek = this.tank.animations.play('fireFromBullet', 20);
    // this.tweenForTank = this.game.add.tween(this.tank);
    // this.weapon.addBulletAnimation('fireFromBullet', [0, 1, 2, 3], 10);

    // this.differenceBetweenHeightOfScreenAndTilemap = this.heightOfBackgroundTilest / this.game.height;
    // console.log(this.differenceBetweenHeightOfScreenAndTilemap);
    // this.scale.setGameSize(1000, 1000);
    // this.game.world.scale.setTo(25, 25);
    // this.layer.resizeWorld();
    // this.game.world.scale.set(1, 1);

  }

  private initMap(initInfo: IPreload) {
    console.log('init map');
    const mapDrawer = new MapDrawer(this.game, initInfo.blocks);
    this.mapDrawer = mapDrawer;
    mapDrawer.generateMap();
  }

  private initUnits() {
    console.log('init units');
    // check whether there is a bullets in a first snapshot
    if (typeof this.snapshots[0].animations.tanks !== 'undefined' && this.snapshots[0].animations.tanks.length > 0) {
      console.log('generating units');
      // generating units
      for (const unit of this.snapshots[0].animations.tanks) {
        const unitId = unit.id,
          color = unit.color,
          positionX = unit.positionX,
          positionY = unit.positionY;
        console.log('Test Units: ' + unit.id + ' ' + unit.positionX + ' ' + unit.positionY);
        this.units.push(new UnitTweenSubject({id: unitId, positionX: positionX, positionY: positionY, type: color, game: this.game}));
      }
    }
    console.log('check whether there is a bullets in a first snapshot');
    // check whether there is a bullets in a first snapshot
    if (typeof this.snapshots[0].animations.bullets !== 'undefined' && this.snapshots[0].animations.bullets.length > 0) {
      console.log('generatuing bullets');
      // generating bullets
      for (const bullet of this.snapshots[0].animations.bullets) {
        console.log('work with last snap?');
        // works with lastshot?
        if ((bullet.firstSnapshot) && (bullet.lastSnapshot)) {
          const positionX = bullet.positionX,
            positionY = bullet.positionY,
            colorBullet = 'green_bullet';
          this.bullets.push(new BulletTweenSubject({
            id: undefined,
            positionX: positionX,
            positionY: positionY,
            type: colorBullet,
            game: this.game
          }, bullet.bulletDirection));
        }
      }
    }
  }

  //
  //
  //
  //
  //
  //
  //

  // private checkNewSnapshotsFromServer() {
  //   this.intervalForRequestingData = setInterval(() => {
  //     this.snapshotService.getSnapshots()
  //       .pipe(first())
  //       .subscribe(requestData => {
  //         this.addSnapshotsInStorage(requestData);
  //         if (requestData.endOfGame !== undefined) {
  //           this.toEndGame(requestData.endOfGame);
  //            this.numberOfCurrentGetSnapshot += this.countOfGettedSnapshot;
  //         }
  //       });
  //   }, 60000);
  // }

  private checkNewSnapshotsFromServer() {
    console.log('Checking new snaps from serv');
    this.intervalForRequestingData = setTimeout(() => {
      this.snapshotService.getSnapshots(this.idOfRoom, this.numberOfCurrentGetSnapshot)
        .pipe(first())
        .subscribe(requestData => {
          console.log('REQU DATA');
          console.log(requestData);
          if (requestData !== undefined) {
            // TO DO
            // if (requestData.frames !== null) {
          this.addSnapshotsInStorage(requestData);
          console.log('requestData');
          console.log(requestData);
          if (requestData.endOfGame !== null) {
            this.toEndGame(requestData.endOfGame);
            // this.numberOfCurrentGetSnapshot += this.countOfGettedSnapshot;
          } else {
            console.log('number of cur snap?' + this.numberOfCurrentGetSnapshot);
            this.numberOfCurrentGetSnapshot += this.countOfGettedSnapshot;
            console.log('number of cur snap?' + this.numberOfCurrentGetSnapshot);
          }
            // TODO what?
            this.checkNewSnapshotsFromServer();
          }
        });
    }, 6000);
  }


  private makeFrameAnimation() {
    console.log('Timeout for makeFrameAnimation');
    let numberOfCurrentSnapshot = 0;
    // actions, that do every frame
    this.intervalForAnimation = setInterval(() => {
      if (typeof this.snapshots !== 'undefined' && this.snapshots.length > 0) {
        console.log('this.snapshots');
        console.log(this.snapshots);
        // making movement for every unit in one snapshot
        this.processAllItemsInSnapshot(this.snapshots.shift());
        // clear destroyed units from array of units
        this.clearEmptyData();
        numberOfCurrentSnapshot++;
        console.log('numberOfCurrentSnapshot');
        console.log(numberOfCurrentSnapshot);
      } else {
        // end SetInterval after all snapshots
        console.log('Nothing elements for painting');
      }
    }, 500);
  }


  // private makeFrameAnimation() {
  //   let numberOfCurrentSnapshot = 0;
  //   // actions, that do every frame
  //   this.intervalForAnimation = setInterval(() => {
  //     if (typeof this.snapshots !== 'undefined' && this.snapshots.length > 0) {
  //       // making movement for every unit in one snapshot
  //       this.processAllItemsInSnapshot(this.snapshots.shift(), this.snapshots[0]);
  //       // clear destroyed units from array of units
  //       this.clearEmptyData();
  //       numberOfCurrentSnapshot++;
  //     } else {
  //       // end SetInterval after all snapshots
  //       console.log('Nothing elements for painting');
  //     }
  //   }, 500);
  // }


  private processAllItemsInSnapshot(snapshot: IFrames) {
    localStorage.setItem('currentSnapshotNumber', snapshot.snapshotNumber.toString());
    console.log('process all items in snapshot');
    console.log(snapshot);
    let numberOfUnit = 0;
    for (const unitSpecifications of snapshot.animations.tanks) {
      this.makeUnitMovement(unitSpecifications, numberOfUnit);
      numberOfUnit++;
    }
    if (typeof snapshot.animations.bullets !== 'undefined' && snapshot.animations.bullets.length > 0) {
      let numberOfBullet = 0;
      for (const bulletSpecifications of snapshot.animations.bullets) {
        this.makeBulletMovement(bulletSpecifications, numberOfBullet);
        numberOfBullet++;
      }
    }
  }

  // private processAllItemsInSnapshot(snapshot: IFrames, snapshotNext: IFrames) {
  //   localStorage.setItem('currentSnapshotNumber', snapshot.snapshotNumber.toString());
  //   let numberOfUnit = 0;
  //   for (const unitSpecifications of snapshot.animations.tanks) {
  //     this.makeUnitMovement(unitSpecifications, numberOfUnit);
  //     numberOfUnit++;
  //   }
  //   if (typeof snapshot.animations.bullets !== 'undefined' && snapshot.animations.bullets.length > 0) {
  //     let numberOfBullet = 0;
  //     for (const bulletSpecifications of snapshot.animations.bullets) {
  //       this.makeBulletMovement(bulletSpecifications, numberOfBullet, snapshotNext);
  //       numberOfBullet++;
  //     }
  //   }
  // }

  private makeUnitMovement(unitSpecifications: ITanks, index: number) {
    const positionX = unitSpecifications.positionX;
    const positionY = unitSpecifications.positionY;
    // check unit is alive and making move,ent
    if (unitSpecifications.alive) {
      this.units[index].moveTo(positionX, positionY);
    } else {
      // destroy sprite, play animation and clear element of array
      console.log('LOOOSER');
      this.units[index].destroy();
      this.units[index] = null;
    }
  }

  private makeBulletMovement(unitSpecifications: IBullets, index: number) {
    console.log('unitSpecifications');
    console.log(unitSpecifications);
    const positionX = unitSpecifications.positionX;
    const positionY = unitSpecifications.positionY;
    const colorBullet = 'green_bullet';
    // check unit is alive and making move,ent
    if (unitSpecifications.firstSnapshot) {
      this.bullets.push(new BulletTweenSubject({
        id: undefined,
        positionX: positionX,
        positionY: positionY,
        type: colorBullet,
        game: this.game
      }, unitSpecifications.bulletDirection));
    } else {
      if (unitSpecifications.lastSnapshot) {
        this.bullets[index].destroy(positionX, positionY, unitSpecifications.bulletDirection);
        this.bullets[index] = null;
      } else {
        this.bullets[index].moveTo(positionX, positionY);
      }
    }
  }

  // private makeBulletMovement(unitSpecifications: IBullets, index: number, snapshotNext: IFrames) {
  //   const positionX = unitSpecifications.positionX;
  //   const positionY = unitSpecifications.positionY;
  //   const colorBullet = 'green_bullet';
  //   // check unit is alive and making move,ent
  //   if (unitSpecifications.firstSnapshot) {
  //     this.bullets.push(new BulletTweenSubject({
  //       id: undefined,
  //       positionX: positionX,
  //       positionY: positionY,
  //       type: colorBullet,
  //       game: this.game
  //     }, unitSpecifications.bulletDirection));
  //   } else {
  //     if ((snapshotNext.animations.bullets.findIndex(x => x.id === unitSpecifications.id)) !== -1) {
  //       this.bullets[index].moveTo(positionX, positionY);
  //     } else {
  //       this.bullets[index].destroy(positionX, positionY, unitSpecifications.bulletDirection);
  //       this.bullets[index] = null;
  //     }
  //   }
  // }


  private clearEmptyData() {
    this.units = this.units.filter((unitSpecifications: UnitTweenSubject) => {
        return unitSpecifications != null;
      }
    );

    this.bullets = this.bullets.filter((bulletSpecifications: BulletTweenSubject) => {
        return bulletSpecifications != null;
      }
    );
  }


  public addSnapshotsInStorage(snapshots: ISnapshotResponse) {
    console.log('add snapsho in storage');
    snapshots.frames.forEach(frame => {
        this.snapshots.push(frame);
      }
    );
  }

  gofull() {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
    } else {
      this.game.scale.startFullScreen(false);
    }
  }

  private toEndGame(endOfGame: IEndOfGame) {
    console.log('toendgame');
    this.userService.addWinnerOfTheGame(endOfGame);
    console.log('перед отпиской');
    clearInterval(this.intervalForRequestingData);
    // this.unsubscribeToAll();
    console.log('this.unsubscribeToAll();');
    console.log('перед подпиской победителя');
    this.subscribingForWinner$ = this.userService.currentWinner.subscribe(data => {
      console.log('this.userService.currentWinner.subscribe(data => {');
      if (data.typeOfEnding !== 'none') {
        const timeToEndGame = this.snapshots.length * 500 + 1000;
        console.log('заводим таймер на редирект');
        setTimeout(() => {
          console.log('исполняем таймер на директ');
          this.acceptToReroutePage = true;
          clearInterval(this.intervalForAnimation);
          localStorage.removeItem('currentSnapshotNumber');
          if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen();
          }
          if (this.subscribingForWinner$) {
            this.subscribingForWinner$.unsubscribe();
          }
          this.router.navigate(['/endgame']);
        }, timeToEndGame);
      }
    });
  }

  public stopGameElements() {
    clearInterval(this.intervalForAnimation);
    this.unsubscribeToAll();
  }

  private unsubscribeToAll() {
    // console.log('before unsubscribe of snapshots');
    // if (this.subscribingForSnapshotMessages$) {
    //   this.subscribingForSnapshotMessages$.unsubscribe();
    // }
    // console.log('before unsubscribe of map');
    // if (this.subscribingForMap$) {
    //   this.subscribingForMap$.unsubscribe();
    // }
  }

  update() {
  }

  render() {
    const renderSizes = this.mapDrawer.getSizeOfTheWorld();
    this.game.renderer.resize(renderSizes.get('sizeOfX'), renderSizes.get('sizeOfY'));
  }


}/**/

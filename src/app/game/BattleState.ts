import {UnitTweenSubject} from './UnitTweenSubject';
import {BulletTweenSubject} from './BulletTweenSubject';
import Sprite = Phaser.Sprite;
import Tilemap = Phaser.Tilemap;
import TilemapLayer = Phaser.TilemapLayer;
import {MapDrawer} from './MapDrawer';
import {SnapshotService} from './snapshot.service';
import {UserService} from '../_services';
import {from, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {ISnapshotResponse, IPreload, IBullets, ITanks, IFrames, IEndOfGame} from './ISnapshotResponse';
import {Router} from '@angular/router';

export class BattleState extends Phaser.State {

  // tween: TweenManager;
  units: UnitTweenSubject[] = [];
  bullets: BulletTweenSubject[] = [];
  collisionArray: any[][];
  // tank: Sprite;
  explosion: Sprite;
  map: Tilemap;
  layer: TilemapLayer;
  testedSprite: Phaser.Sprite;
  spritesOfWalls: Phaser.Sprite[];
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
  wallGroup: Phaser.Group;
  tankGroup: Phaser.Group;
  sizeOfXMap: number;
  sizeOfYMap: number;

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
    this.game.load.image('green_bullet', 'assets/images/tanks_robo/circle-cropped.png');
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
    this.game.load.image('transp', 'assets/images/tanks_robo/transp.png');
    this.game.load.spritesheet('explosion', 'assets/images/tanks_robo/piskel.png', 65, 65);
    this.game.load.spritesheet('fireFromBullet', 'assets/images/tanks_robo/bullet_fire.png', 21, 38);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
  }

  create() {
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);


    document.getElementById('fullScreenTurn');
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.input.onDown.add(this.gofull, this);
    this.initMap(this.initInfo);
    this.collisionArray = this.initInfo.blocks.map((line) => line.split(''));
    this.collisionArray.forEach(elem => {
      for (let i = 0; i < elem.length; i++) {
        elem[i] = Number(elem[i]);
      }
    });
    console.log('this.collisionArray');
    console.log(this.collisionArray);
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
    }, 50000);
    this.initUnits();
    // const weapon = this.game.add.weapon(400, 'green_bullet');
    // //  The bullet will be automatically killed when it leaves the world bounds
    // weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    // //  Because our bullet is drawn facing up, we need to offset its rotation:
    // weapon.bulletAngleOffset = 90;
    // //  The speed at which the bullet is fired
    // weapon.bulletSpeed = 90;
    //
    // //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    // weapon.fireRate = 60;
    //
    // const sprite = this.add.sprite(5*64+32, 3*64+32, 'tank_green');
    // sprite.anchor.setTo(0.5, 0.5);
    // sprite.angle = 0;
    // this.game.physics.arcade.enable(sprite);
    //
    // //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
    // weapon.trackSprite(sprite, 0, 0, true);
    //
    // weapon.fire();
    // setTimeout(() => {
    //   weapon.fire();
    // }, 300);
    //
    // weapon.onFire.add(function() {
    //   console.log('FIRE');
    // });

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
    this.spritesOfWalls = mapDrawer.generateMap();
    console.log('spritesOfWalls in main');
    this.sizeOfYMap = this.mapDrawer.countOfYBlocks;
    this.wallGroup = this.game.add.group();
    console.log(this.spritesOfWalls);
    this.spritesOfWalls.forEach(wall => {
      this.wallGroup.add(wall);
    });
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
          positionY = this.sizeOfYMap - unit.positionY - 1;
        console.log('Test Units: ' + unit.id + ' ' + unit.positionX + ' ' + unit.positionY);
        const tweenSubj = new UnitTweenSubject(
          {
            id: unitId,
            positionX: positionX,
            positionY: positionY, type: color, walls: this.wallGroup, game: this.game, yWorld: this.mapDrawer.countOfYBlocks
          });
        this.units.push(tweenSubj);
        // this.tankGroup.add(tweenSubj.spriteLink);
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
            positionY = this.sizeOfYMap - bullet.positionY - 1,
            colorBullet = 'green_bullet';
          this.bullets.push(new BulletTweenSubject({
            id: undefined,
            positionX: positionX,
            positionY: positionY,
            type: colorBullet,
            walls: this.spritesOfWalls,
            game: this.game,
            yWorld: this.mapDrawer.countOfYBlocks
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
    }, 5000);
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
    const positionY = this.sizeOfYMap - unitSpecifications.positionY - 1;
    const idOfTank = unitSpecifications.id;
    // check unit is alive and making move,ent
    const unit = this.units.find(x => x.id === idOfTank);
    if (unitSpecifications.alive) {
      console.log('before moving');
      console.log(unit);
      unit.moveTo(positionX, positionY, unitSpecifications.unitDirection);
    } else {
      // destroy sprite, play animation and clear element of array
      console.log('LOOOSER');
      const foundIndex = this.units.findIndex(x => x.id === idOfTank);
      this.units.splice(foundIndex, 1);
      unit.destroy();
    }
  }

  private makeBulletMovement(unitSpecifications: IBullets, index: number) {
    console.log('unitSpecifications');
    console.log(unitSpecifications);
    const positionX = unitSpecifications.positionX;
    const positionY = this.sizeOfYMap - unitSpecifications.positionY - 1;
    const colorBullet = 'green_bullet';
    // check unit is alive and making move,ent
    if (unitSpecifications.firstSnapshot && unitSpecifications.lastSnapshot) {
      const bullet = new BulletTweenSubject({
        id: unitSpecifications.id,
        positionX: positionX,
        positionY: positionY,
        type: colorBullet,
        walls: this.wallGroup,
        game: this.game,
        yWorld: this.mapDrawer.countOfYBlocks
      }, unitSpecifications.bulletDirection);
      bullet.makeSmoke(positionX, positionY, unitSpecifications.bulletDirection);
      bullet.destroy(positionX, positionY, unitSpecifications.bulletDirection);
    } else {
      if (unitSpecifications.firstSnapshot) {
        this.bullets.push(new BulletTweenSubject({
          id: unitSpecifications.id,
          positionX: positionX,
          positionY: positionY,
          type: colorBullet,
          walls: this.wallGroup,
          game: this.game,
          yWorld: this.mapDrawer.countOfYBlocks
        }, unitSpecifications.bulletDirection));
      } else {
        const bullet = this.bullets.find(x => x.id === unitSpecifications.id);
        if ((this.bullets.find(x => x.id === unitSpecifications.id)) === undefined) {
          bullet.destroy(positionX, positionY, unitSpecifications.bulletDirection);
        } else {
          if (unitSpecifications.lastSnapshot) {
            bullet.destroy(positionX, positionY, unitSpecifications.bulletDirection);
            const foundIndex = this.bullets.findIndex(x => x.id === unitSpecifications.id);
            this.bullets.splice(foundIndex, 1);
            // this.bullets[index] = null;
          } else {
            bullet.moveTo(positionX, positionY, unitSpecifications.bulletDirection);
          }
        }
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


    // if (this.units[1].getSprite().overlap()) {
    //   console.log('SUQQQQQA');
    //   this.units[1].spriteLink.alpha = 0;
    // }

    // if (this.units[1].getSprite().overlap()) {
    //   console.log('SUQQQQQA');
    //   this.units[1].spriteLink.alpha = 0;
    // }

    // this.collisionArray.forEach((elem, index) => {
    //   for (let i = 0; i < elem.length; i++) {
    //     if (this.units[1].getSprite().overlap(this.mapDrawer.map.getTile(9, 10))) {
    //
    //     }
    //   }
    // // });
    // this.units.forEach(unit => {
    //   this.spritesOfWalls.forEach(wall => {
    //     if (unit.getSprite().overlap(wall)) {
    //       console.log('OPA');
    //       unit.spriteLink.alpha = 0;
    //     }
    //   });
    // });

    // this.spritesOfWalls.forEach(wall => {
    //   this.units.forEach(obj => {
    //     if (obj.getSprite().overlap(wall)) {
    //       console.log('OPA');
    //       obj.spriteLink.alpha = 0;
    //     }
    //   });
    // }});
  }

  render() {
    const renderSizes = this.mapDrawer.getSizeOfTheWorld();
    this.game.renderer.resize(renderSizes.get('sizeOfX'), renderSizes.get('sizeOfY'));
  }

  getWalls() {
    return this.spritesOfWalls;
  }

}/**/

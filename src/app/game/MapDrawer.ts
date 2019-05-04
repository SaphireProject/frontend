import Game = Phaser.Game;
import Tilemap = Phaser.Tilemap;
import TilemapLayer = Phaser.TilemapLayer;
import Tileset = Phaser.Tileset;

export class MapDrawer {
  game: Game;
  blocks;
  map: Tilemap;
  layer: TilemapLayer;
  location: Tileset;
  heightOfBackgroundTilest: number;
  widthOfBackgroundTileset: number;
  storageOfBlocks = ['crateWood', 'crateMetal', 'barricadeMetal', 'barricadeWood'];
  storageOfGround = ['tileGrass1', 'tileGrass2', 'tileSand1'];
  countOfXBlocks: number;
  countOfYBlocks: number;



  constructor(game: Game, blocks) {
    this.game = game;
    this.blocks = blocks;
    this.countOfXBlocks = blocks[0].length;
    this.countOfYBlocks = blocks.length;

  }

  generateMap2() {
    this.game.world.setBounds(0, 0, 1000, 1000);
    this.map = this.game.add.tilemap('mapa');
    // this.map.setTileSize( 80, 80);
    this.location = this.map.addTilesetImage('allSprites_default', 'tiles');
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    // this.map.setCollision(); - для того, чтобы настроить ограничения
    this.heightOfBackgroundTilest = this.map.heightInPixels;
    this.widthOfBackgroundTileset = this.map.widthInPixels;
    console.log(this.game.width);
    console.log(this.heightOfBackgroundTilest);
    console.log('center in drawer ' + this.game.world.centerX);
    console.log('center in drawer ' + this.game.world.centerY);
  }

  generateMap() {
    this.game.world.setBounds(0, 0, 1000, 1000);
    this.game.add.tileSprite(0, 0, this.countOfXBlocks * 64, this.countOfYBlocks * 64, this.storageOfGround[Math.round(0 - 0.5 + Math.random() * (this.storageOfGround.length))]);

    // this.map = this.game.add.tilemap('mapa');
    // // this.map.setTileSize( 80, 80); commited
    // this.location = this.map.addTilesetImage('allSprites_default', 'tiles');
    // this.layer = this.map.createLayer('Tile Layer 1');
    // this.layer.resizeWorld();
    // this.map.setCollision(); - для того, чтобы настроить ограничения
    // this.heightOfBackgroundTilest = this.map.heightInPixels;
    // this.widthOfBackgroundTileset = this.map.widthInPixels;
    // console.log(this.game.width);
    // console.log(this.heightOfBackgroundTilest);
    // console.log('center in drawer ' + this.game.world.centerX);
    // console.log('center in drawer ' + this.game.world.centerY);

    const map = this.blocks.map((line) => line.split('')); // Разбиваем линии на отдельные символы

    // Generate random blocks from matrix
    map.forEach((line, y) => line.forEach((char, x) => {
      if (char !== '1') {
        return;
      }

      // Если символ соответствует `X`, нарисуем вместо него звезду.
      // 24 - ширина изображения.
      // 22 - высота.
      this.game.add.sprite(x * 64, y * 64, this.storageOfBlocks[Math.round(0 - 0.5 + Math.random() * (this.storageOfBlocks.length))]);
    }));
  }

  public getSizeOfTheWorld(): Map<string, number> {
    const sizeOfTheWorld: Map<string, number> = new Map<string, number>();
    sizeOfTheWorld.set('sizeOfX', this.countOfXBlocks * 64);
    sizeOfTheWorld.set('sizeOfY', this.countOfYBlocks * 64);
    return sizeOfTheWorld;
  }
}

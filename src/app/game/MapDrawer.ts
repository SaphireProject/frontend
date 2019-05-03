import Game = Phaser.Game;
import Tilemap = Phaser.Tilemap;
import TilemapLayer = Phaser.TilemapLayer;
import Tileset = Phaser.Tileset;

export class MapDrawer {
  game: Game;
  map: Tilemap;
  layer: TilemapLayer;
  location: Tileset;
  heightOfBackgroundTilest: number;
  widthOfBackgroundTileset: number;

  constructor(game: Game) {
    this.game = game;
  }

  generateMap() {
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
}

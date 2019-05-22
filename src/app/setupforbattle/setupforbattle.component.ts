import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material';



@Component({
  selector: 'app-setupforbattle',
  templateUrl: './setupforbattle.component.html',
  styleUrls: ['./setupforbattle.component.css']
})
export class SetupforbattleComponent implements OnInit {
  chosenTank: string;

  constructor() {
  }

  ngOnInit() {
  }

  choseArmy(chosenTank: string) {
    this.chosenTank = chosenTank;
  }

  getPathToImage() {
    switch (this.chosenTank) {
      case ('tank_green'):
        return 'assets/images/tanks_robo/tank_green.png';
      case ('tank_red'):
        return 'assets/images/tanks_robo/tank_red.png';
      case ('tank_blue'):
        return 'assets/images/tanks_robo/tank_blue.png';
      case ('tank_dark'):
        return 'assets/images/tanks_robo/tank_dark.png';
      case ('tank_sand'):
        return 'assets/images/tanks_robo/tank_sand.png';
    }
  }
}

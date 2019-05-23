import { Component, OnInit } from '@angular/core';
import {MatDialog, ThemePalette} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataRoomService} from '../_services/dataroom.service';
import {AlertService} from '../_services';
import {StrategyService} from '../_services/strategy.service';
import {HttpErrorResponse} from '@angular/common/http';
import {InviteDialogComponent} from '../dialogs/invite-dialog/invite-dialog.component';
import {ShowcodedialogComponent} from '../dialogs/showcodedialog/showcodedialog.component';



@Component({
  selector: 'app-setupforbattle',
  templateUrl: './setupforbattle.component.html',
  styleUrls: ['./setupforbattle.component.css']
})
export class SetupforbattleComponent implements OnInit {
  chosenTank: string;
  // strategies = [];
  strategies = [
    {id: 1, name: 'Str'},
    {id: 2, name: 'fdsfStr'},
    {id: 3, name: 'fdgdfgsdfgdfggsdffgdfsStr'},
    {id: 4, name: 'Fourth Strategy'},
  ];
  idOfChosenStrategy: number;
  readyToPlay = false;

  constructor(public dialog: MatDialog,
              private dataRoomService: DataRoomService,
              private alertService: AlertService,
              private strategyService: StrategyService) {
  }

  ngOnInit() {
    // this.strategyService.getStrategiesByUserId().subscribe((data) => {
    //     this.strategies = data.strategies;
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.alertService.error('Strategies not found. Please, try later');
    //   }
    // );
  }

  choseArmy(chosenTank: string) {
    this.chosenTank = chosenTank;
  }

  searchValueOfStrategy() {
    return this.strategies.find(x => x.id === this.idOfChosenStrategy).name;
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

  test(idOfChosenStrategy: number) {
    this.idOfChosenStrategy = idOfChosenStrategy;
  }

  checkForDisablingConfirm() {
    return (this.chosenTank === undefined) || (this.idOfChosenStrategy === undefined) || (this.readyToPlay);
  }

  confirmData() {
    this.dataRoomService.confirmReadyToPlay(this.chosenTank, this.idOfChosenStrategy).subscribe(data => {
        this.alertService.success('Now you ready to play. Please, wait other gamers');
      },
      error => {
        this.alertService.error('Please, try later');
      });
  }

  showStrategy() {
    this.strategyService.getStrategyByIdOfStrategy(this.idOfChosenStrategy).subscribe(data => {
      const dialogRef = this.dialog.open(ShowcodedialogComponent, {
        data: {code: data.description}
      });
    },
      error => {
      this.alertService.error('Strategy was not found, please try later');
      });
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable} from '@angular/material';
import {InviteDialogComponent} from '../invite-dialog/invite-dialog.component';
import {DataRoomService} from '../_services/dataroom.service';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

export interface PeriodicElement {
  id: number;
  username: string;
  email: string;
  status: number;
  chosenTank: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, username: 'Hydrogen', email: 'tet@mal.ru', status: 0, chosenTank: 'sdfsf' },
  {id: 2, username: 'Helium', email: 'tet@masl.ru', status: 0, chosenTank: 'sdfsf'},
  {id: 3, username: 'Lithium', email: 'tetd@mal.ru', status: 0, chosenTank: 'sdfsf'},
  {id: 4, username: 'Beryllium', email: 'tet@mal.com', status: 0, chosenTank: 'sdfsf'},
  {id: 5, username: 'Boron', email: 'tet@emal.ru', status: 0, chosenTank: 'sdfsf'},
  {id: 6, username: 'Carbon', email: 'twqet@emal.ru', status: 0, chosenTank: 'sdfsf'},
  {id: 7, username: 'Nitrogen', email: 'dftet@emal.ru', status: 0, chosenTank: 'sdfsf'},
  {id: 8, username: 'Oxygen', email: 'tets@emal.ru', status: 0, chosenTank: 'sdfsf'},
  {id: 9, username: 'Fluorine', email: 'fd@asm.ru', status: 0, chosenTank: 'sdfsf'},
  {id: 10, username: 'Neon', email: 'dsfs@.ru', status: 0, chosenTank: 'sdfsf'},
];


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(public dialog: MatDialog,
              public dataRoomService: DataRoomService) { }

  displayedColumns: string[] = ['avatar', 'username', 'email', 'status', 'chosenTank', 'actions'];
  dataSource = ELEMENT_DATA;
  index: number;
  id: number;

  ngOnInit() {
  }

  addNew(username: string) {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      data: {username: username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }


  startEdit(i: any, id: any, username: any, status: any, chosenTank: string | string) {
    console.log('((((');
    this.dataSource[1] = {id: 1, username: '`gopa', email: '231', status: 1, chosenTank: 'asd' }
    this.table.renderRows();
  }


  deleteItem(i: any, id: number, email: string, username: string, status: number, chosenTank: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {  id: id, username: username, email: email, status: status, choosenTank: chosenTank}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        // this.refreshTable();
      }
    });
  }


}

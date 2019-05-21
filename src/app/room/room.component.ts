import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTable} from '@angular/material';
import {InviteDialogComponent} from '../invite-dialog/invite-dialog.component';
import {DataRoomService} from '../_services/dataroom.service';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';
import {DataSource} from '@angular/cdk/collections';
import {IUserStatus} from '../_models/game-rooms-models/response/IGetUserStatusResponse';
import {BehaviorSubject, fromEvent, merge, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../_services';


//
// let ELEMENT_DATA: IUserStatus[] = [
//   {id: 1, username: 'Hydrogen', email: 'tet@mal.ru', status: 0, chosenTank: 'sdfsf' },
//   {id: 2, username: 'Helium', email: 'tet@masl.ru', status: 0, chosenTank: 'sdfsf'},
//   {id: 3, username: 'Lithium', email: 'tetd@mal.ru', status: 0, chosenTank: 'sdfsf'},
//   {id: 4, username: 'Beryllium', email: 'tet@mal.com', status: 0, chosenTank: 'sdfsf'},
//   {id: 5, username: 'Boron', email: 'tet@emal.ru', status: 0, chosenTank: 'sdfsf'},
//   {id: 6, username: 'Carbon', email: 'twqet@emal.ru', status: 0, chosenTank: 'sdfsf'},
//   {id: 7, username: 'Nitrogen', email: 'dftet@emal.ru', status: 0, chosenTank: 'sdfsf'},
//   {id: 8, username: 'Oxygen', email: 'tets@emal.ru', status: 0, chosenTank: 'sdfsf'},
//   {id: 9, username: 'Fluorine', email: 'fd@asm.ru', status: 0, chosenTank: 'sdfsf'},
//   {id: 10, username: 'Neon', email: 'dsfs@.ru', status: 0, chosenTank: 'sdfsf'},
// ];


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  gameStatus: any[] = ['Invited', 'Preparing for game', 'Ready'];
  // colorDescription = [
  //   {key: 'tank_green', descr: 'Green' },
  //   {key: 'tank_red', descr: 'Red' },
  //   {key: 'tank_blue', descr: 'Blue' },
  //   {key: 'tank_dark', descr: 'Dark' },
  //   {key: 'tank_sand', descr: 'Sand' },
  // ];
  colorDescription: Map<string, string>;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  // dataSource = ELEMENT_DATA;
  dataSource: ExampleDataSource | null;
  exampleDatabase: DataRoomService | null;
  index: number;
  id: number;

  constructor(public dialog: MatDialog,
              public dataRoomService: DataRoomService,
              public httpClient: HttpClient,
              public alertService: AlertService) {
  }

  displayedColumns: string[] = ['avatar', 'username', 'email', 'readyToPlay', 'chosenTank', 'actions'];

  ngOnInit() {
    this.colorDescription = new Map([
      ['tank_green', 'Green'],
      ['tank_red', 'Red'],
      ['tank_blue', 'Blue'],
      ['tank_dark', 'Dark'],
      ['tank_sand', 'Sand']
    ]);

    this.loadData();

    setTimeout(() => {
      this.exampleDatabase.nextPackUsers([
        {idOfUser: 1, username: 'Hydrogen', email: 'tet@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 2, username: 'Helium', email: 'tet@masl.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 4, username: 'Beryllium', email: 'tet@mal.com', readyToPlay: 0, chosenTank: 'sdfsf'}
      ]);
      // this.table.renderRows();
    }, 1000);


    setTimeout(() => {
      this.exampleDatabase.nextPackUsers([
        {idOfUser: 1, username: 'Hydrogen', email: 'tet@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 2, username: 'Helium', email: 'tet@masl.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
      ]);
      // this.table.renderRows();
    }, 3000);

    setTimeout(() => {
      this.exampleDatabase.nextPackUsers([
        {idOfUser: 1, username: 'Hydrogen', email: 'tet@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 2, username: 'Helium', email: 'tet@masl.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 4, username: 'Beryllium', email: 'tet@mal.com', readyToPlay: 0, chosenTank: 'sdfsf'}
      ]);
      // this.table.renderRows();
    }, 2000);

    setTimeout(() => {
      this.exampleDatabase.nextPackUsers([
        {idOfUser: 1, username: 'Hydrogen', email: 'tet@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 2, username: 'Helium', email: 'tet@masl.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 4, username: 'Beryllium', email: 'tet@mal.com', readyToPlay: 0, chosenTank: 'sdfsf'}
      ]);
      // this.table.renderRows();
    }, 4000);

    setTimeout(() => {
      this.exampleDatabase.nextPackUsers([
        {idOfUser: 1, username: 'Hydrogen', email: 'tet@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 2, username: 'Helium', email: 'tet@masl.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'sdfsf'},
        {idOfUser: 4, username: 'Beryllium', email: 'tet@mal.com', readyToPlay: 0, chosenTank: 'sdfsf'}
      ]);
      // this.table.renderRows();
    }, 4000);

    setTimeout(() => {
      this.exampleDatabase.nextPackUsers([
        {idOfUser: 1, username: 'KEKS', email: 'tet@mal.ru', readyToPlay: 0, chosenTank: 'tank_green'},
        {idOfUser: 2, username: 'HeliDsaum', email: 'tet@masl.ru', readyToPlay: 1, chosenTank: 'tank_sand'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'tank_blue'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 2, chosenTank: 'tank_sand'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 1, chosenTank: 'tank_red'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'tank_sand'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 1, chosenTank: 'tank_red'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 1, chosenTank: 'tank_red'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 2, chosenTank: 'tank_blue'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 0, chosenTank: 'tank_red'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 1, chosenTank: 'tank_red'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 1, chosenTank: 'tank_blue'},
        {idOfUser: 3, username: 'Lithium', email: 'tetd@mal.ru', readyToPlay: 2, chosenTank: 'tank_green'},
        {idOfUser: 4, username: 'Beryllium', email: 'tet@mal.com', readyToPlay: 0, chosenTank: 'tank_green'}
      ]);
      // this.table.renderRows();
    }, 5000);

  }

  private refreshTable() {
    // this.paginator._changePageSize(this.paginator.pageSize);
    this.table.renderRows();
  }

  addNew(username: string) {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      data: {username: username}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        console.log('gopa1');
        this.exampleDatabase.dataChange.value.push(this.dataRoomService.getDialogData());
        console.log('gopa');
        this.refreshTable();
        console.log(this.exampleDatabase.dataChange.value);
      }
    });
  }

  public loadData() {
    this.exampleDatabase = new DataRoomService(this.httpClient, this.alertService);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
    // // .debounceTime(150)
    // // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    // setInterval(() => {
    //   this.exampleDatabase.getAllUsers();
    // }, 6000)
    // ;
  }


  deleteItem(i: any, id: number, email: string, username: string, status: number, chosenTank: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, username: username, email: email, status: status, chosenTank: chosenTank}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idOfUser === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  getColorForStatus(readyToPlay: any) {
    switch (readyToPlay) {
      case (0):
        return '#ffd507';
      case (1):
        return 'blue';
      case (2):
        return 'rgba(0, 167, 121, 0.81)';
    }
  }

  getColorOfTank(chosenTank: string) {
    switch (chosenTank) {
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
      default:
        return 'not found';
    }
  }
}

export class ExampleDataSource extends DataSource<IUserStatus> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: IUserStatus[] = [];
  renderedData: IUserStatus[] = [];


  constructor(public _exampleDatabase: DataRoomService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    console.log('nu che');
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IUserStatus[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllUsers();


    return merge(...displayDataChanges).pipe(map(() => {
        // Filter data
        console.log('etf');
        this.filteredData = this._exampleDatabase.data.slice().filter((user: IUserStatus) => {
          const searchStr = (user.idOfUser + user.username + user.email + user.chosenTank + user.readyToPlay).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });
        //
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        //
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }
    ));
  }

  disconnect() {
  }

  //
  //
  // /** Returns a sorted copy of the database data. */
  sortData(data: IUserStatus[]): IUserStatus[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'idOfUser':
          [propertyA, propertyB] = [a.idOfUser, b.idOfUser];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        case 'username':
          [propertyA, propertyB] = [a.username, b.username];
          break;
        case 'chosenTank':
          [propertyA, propertyB] = [a.chosenTank, b.chosenTank];
          break;
        case 'readyToPlay':
          [propertyA, propertyB] = [a.readyToPlay, b.readyToPlay];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


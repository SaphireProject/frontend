import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTable} from '@angular/material';
import {ExampleDataSource} from '../room/room.component';
import {NotificationService} from '../_services/notification.service';
import {HttpClient} from '@angular/common/http';
import {AlertService, UserService} from '../_services';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {InviteDialogComponent} from '../dialogs/invite-dialog/invite-dialog.component';
import {DataSource} from '@angular/cdk/table';
import {IUserStatus} from '../_models/game-rooms-models/response/IGetUserStatusResponse';
import {map} from 'rxjs/operators';
import {IGetNotificationNewResponse} from '../_models/game-rooms-models/response/IGetNotificationNewResponse';
import {IGetAllNotificationsResponse, NotificationInfo} from '../_models/game-rooms-models/response/IGetAllNotificationsResponse';
import {GotogameDialogComponent} from '../dialogs/gotogame-dialog/gotogame-dialog.component';
import {RefusegameDialogComponent} from '../dialogs/refusegame-dialog/refusegame-dialog.component';

@Component({
  selector: 'app-invitelist',
  templateUrl: './invitelist.component.html',
  styleUrls: ['./invitelist.component.css']
})
export class InvitelistComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  dataSource: NotificationDataSource | null;
  exampleDatabase: NotificationService | null;
  index: number;
  id: number;
  displayedColumns: string[] = ['emailOfAdmin', 'usernameOfAdmin', 'nameOfRoom', 'countOfPlayers', 'gameCardSize', 'actions'];

  constructor(public dialog: MatDialog,
              public notificationService: NotificationService,
              public httpClient: HttpClient,
              public userService: UserService,
              public alertService: AlertService) {
  }


  ngOnInit() {
    this.loadData();
  }

  private refreshTable() {
    // this.paginator._changePageSize(this.paginator.pageSize);
    this.table.renderRows();
  }

  public loadData() {
    this.exampleDatabase = new NotificationService(this.httpClient, this.userService, this.alertService);
    this.dataSource = new NotificationDataSource(this.exampleDatabase, this.paginator, this.sort);
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

  getToInvite(i: any, idOfInvite: number) {
    const dialogRef = this.dialog.open(GotogameDialogComponent, {
      data: {idOfInvite: idOfInvite}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        console.log('gopa1');
        this.exampleDatabase.dataChange.value.push(this.notificationService.getDialogData());
        console.log('gopa');
        this.refreshTable();
        console.log(this.exampleDatabase.dataChange.value);
      }
    });
  }

  cancelFromInvite(i: any, idOfInvite: number) {
    this.index = i;
    this.id = idOfInvite;
    const dialogRef = this.dialog.open(RefusegameDialogComponent, {
      data: {idOfInvite: idOfInvite}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idOfInvite === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }
}

export class NotificationDataSource extends DataSource<NotificationInfo> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: NotificationInfo[] = [];
  renderedData: NotificationInfo[] = [];


  constructor(public _exampleDatabase: NotificationService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    console.log('nu che');
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<NotificationInfo[]> {
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
        this.filteredData = this._exampleDatabase.data.slice().filter((invite: NotificationInfo) => {
          const searchStr = (invite.nameOfRoom + invite.usernameOfAdmin + invite.countOfPlayers + invite.heightOfMapForGame).toLowerCase();
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
  sortData(data: NotificationInfo[]): NotificationInfo[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'nameOfRoom':
          [propertyA, propertyB] = [a.nameOfRoom, b.nameOfRoom];
          break;
        case 'usernameOfAdmin':
          [propertyA, propertyB] = [a.usernameOfAdmin, b.usernameOfAdmin];
          break;
        case 'countOfPlayers':
          [propertyA, propertyB] = [a.countOfPlayers, b.countOfPlayers];
          break;
        case 'gameCardSize':
          [propertyA, propertyB] = [a.heightOfMapForGame, b.heightOfMapForGame];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


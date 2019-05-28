import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTable} from '@angular/material';
import {NotificationDataSource} from '../../invitelist/invitelist.component';
import {NotificationService} from '../../_services/notification.service';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {UserService} from '../../_services';
import {DataSource} from '@angular/cdk/table';
import {NotificationInfo} from '../../_models/game-rooms-models/response/IGetAllNotificationsResponse';
import {map} from 'rxjs/operators';
import {User} from '../../_models';
import {HttpClient} from '@angular/common/http';
import {DataRoomService} from '../../_services/dataroom.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  dataSource: PeopleDataSource | null;
  database: UserService | null;
  displayedColumns: string[] = ['avatar', 'email', 'username'];
  idOfUser: number;

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private dataRoomService: DataRoomService,
              private router: Router) {
  }

  ngOnInit() {
    this.idOfUser = this.userService.currentUserValue.id;
    this.paginator._intl.itemsPerPageLabel = 'People per page';
    this.loadData();
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    // this.table.renderRows();
  }

  public loadData() {
    this.database = new UserService(this.httpClient);
    this.dataSource = new PeopleDataSource(this.database, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
    // // .debounceTime(150)
    // // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
    // this.timerForNotifications = setInterval(() => {
    //   // >>>>>>>>>
    //   this.exampleDatabase.getAllNotifications();
    // }, 6000)
    // ;
  }

  inviteToPlay(username: string, id: number) {
    this.dataRoomService.addToInviteBuffer(id, username);
    this.router.navigate(['/create-room']);
  }
}

export class PeopleDataSource extends DataSource<UserTable> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: UserTable[] = [];
  renderedData: UserTable[] = [];


  constructor(public _exampleDatabase: UserService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    console.log('nu che');
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserTable[]> {
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
        this.filteredData = this._exampleDatabase.dataChange.value.slice().filter((userTable: UserTable) => {
          console.log('vtf');
          const searchStr = (userTable.email + userTable.username).toLowerCase();
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
  sortData(data: UserTable[]): UserTable[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'username':
          [propertyA, propertyB] = [a.username, b.username];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}


export class UserTable {
  id: number;
  username: string;
  email: string;
  bio: string;
}

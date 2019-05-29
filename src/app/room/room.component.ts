import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTable} from '@angular/material';
import {InviteDialogComponent} from '../dialogs/invite-dialog/invite-dialog.component';
import {DataRoomService, PlayerRole} from '../_services/dataroom.service';
import {DeleteDialogComponent} from '../dialogs/delete-dialog/delete-dialog.component';
import {DataSource} from '@angular/cdk/collections';
import {IUserStatus} from '../_models/game-rooms-models/response/IGetUserStatusResponse';
import {BehaviorSubject, fromEvent, merge, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AlertService, UserService} from '../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {LeaveDialogComponent} from '../dialogs/leave-dialog/leave-dialog.component';
import {IGetGameIsStartedResponse} from '../_models/game-rooms-models/response/IGetGameIsStartedResponse';
import {el} from '@angular/platform-browser/testing/src/browser_util';


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
export class RoomComponent implements OnInit, OnDestroy {

  gameStatus: any[] = ['Invited', 'Preparing', 'Ready'];
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
  playerRole$: Subscription;
  readyToPlay$: Subscription;
  index: number;
  id: number;
  timerForUpdateBase;
  sub: any;
  idOfRoute: number;
  readingForStartGame = false;
  playerRole: PlayerRole;
  isLimitPlayers = false;
  loadingRingStatus = false;
  gameIsReadyInterval;

  constructor(public dialog: MatDialog,
              public dataRoomService: DataRoomService,
              public httpClient: HttpClient,
              public alertService: AlertService,
              public userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  displayedColumns: string[] = ['avatar', 'username', 'email', 'readyToPlay', 'chosenTank'];

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Players per page';
    this.sub = this.route.params.subscribe(params => {
      this.idOfRoute = +params['id']; // (+) converts string 'id' to a number
      // if (this.idOfRoute !== this.idOfRoute) {
      //   this.router.navigate(['/error?type=404']);
      // }
      this.dataRoomService.addRoomStorage(this.idOfRoute);
    });

    this.colorDescription = new Map([
      ['tank_green', 'Green'],
      ['tank_red', 'Red'],
      ['tank_blue', 'Blue'],
      ['tank_dark', 'Dark'],
      ['tank_sand', 'Sand']
    ]);

    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new DataRoomService(this.httpClient, this.alertService, this.userService);
    this.exampleDatabase.addRoomStorage(this.idOfRoute);
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

    this.playerRole$ = this.exampleDatabase.playerRole.subscribe(data => {
      console.log('DATA FOR ROLE');
      console.log(data);
      switch (data) {
        case PlayerRole.admin:
          this.playerRole = PlayerRole.admin;
          this.displayedColumns = ['avatar', 'username', 'email', 'readyToPlay', 'chosenTank', 'actions'];
          this.checkReadyToActivateTheGame();
          break;
        case PlayerRole.deleted:
          this.alertService.error('Sorry, you were expelled from this game. Try your own game');
          this.router.navigate(['/']);
          break;
        default:
          console.log('just user');
          this.checkForGameIsReady();
          break;
      }
    });
    this.checkForBufferInvites();
    this.timerForUpdateBase = setInterval(() => {
      this.exampleDatabase.getAllUsers();
      // this.refreshTable();
    }, 6000)
    ;
  }

  private checkReadyToActivateTheGame() {
    this.readyToPlay$ = this.exampleDatabase.readyToGame.subscribe(data => {
      console.log('ready!');
      if (data) {
        this.readingForStartGame = true;
        this.alertService.success('Everyone is ready, start the game');
      } else {
        this.readingForStartGame = false;
      }
    });
  }

  private checkForGameIsReady() {
    this.gameIsReadyInterval = setInterval(() => {
      this.exampleDatabase.checkForGameIsReady().subscribe((data: IGetGameIsStartedResponse) => {
          if (data.status === true) {
            this.router.navigate(['/game']);
          } else {
            console.log(data.status);
          }
        },
        error => {
          console.log('error for checking status');
          console.log(error);
          this.alertService.error('Oops, something happened. Please try later');
        });
    }, 3000);
    console.log('check for game');
  }

  addNew(username: string) {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      data: {username: username}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataRoomService.getDialogData());
        this.refreshTable();
        // console.log(this.exampleDatabase.dataChange.value);
      }
    });
  }

  deleteItem(i: any, id: number, email: string, username: string, status: number, chosenTank: string) {
    // this.index = i;
    // this.id = id;
    this.index = i;
    id = this.exampleDatabase.dataChange.value.find(x => x.email === email).idOfUser;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.idOfUser === id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  getInfoAboutCountOfPlayers() {
    if (this.exampleDatabase.dataChange.value.length < 2) {
      this.isLimitPlayers = false;
      return 'You are alone in this room now, please add your friends and fight with them';
    } else {
      const maximumLength = this.exampleDatabase.maxLengthOfRoomStorage;
      const currentCount = this.exampleDatabase.dataChange.value.length;
      const difference = maximumLength - currentCount;
      if ((difference < 4) && (difference > 1)) {
        this.isLimitPlayers = false;
        return `You have ${maximumLength - currentCount} people left to fill the room,` +
          `add more your friends or wait for those already invited and start the game`;
      } else {
        if (difference > 4) {
          this.isLimitPlayers = false;
          return 'Your room is still fairly free, add more your friends or wait for those already invited and start the game';
        } else {
          this.isLimitPlayers = true;
          return 'Your room is full of players, wait for those already invited and start the game';
        }
      }
    }
  }

  startGame() {
    this.readyToPlay$.unsubscribe();
    this.loadingRingStatus = true;
    this.readingForStartGame = false;
    this.dataRoomService.startTheGame().subscribe(() => {
        console.log('fsdf');
        this.router.navigate(['/game']);
      },
      error => {
        this.alertService.error('Oops, something wrong! Please, try later');
        this.loadingRingStatus = false;
        setTimeout(() => {
          this.checkReadyToActivateTheGame();
        }, 2000);
      });
  }

  goOut() {
    const idOfRoom = this.exampleDatabase.idOfRoomStorage;
    console.log('check');
    console.log(idOfRoom);
    const dialogRef = this.dialog.open(LeaveDialogComponent, {
      data: {idOfRoom}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.exampleDatabase.leaveFromRoom(idOfRoom);
        this.router.navigate(['/']);
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    // this.table.renderRows();
  }

  private checkForBufferInvites() {
    const bufferInvite = JSON.parse(localStorage.getItem('bufferInvite'));
    console.log('invite');
    console.log(bufferInvite);
    if (bufferInvite !== null) {
      this.dataRoomService.addUser(bufferInvite);
      localStorage.removeItem('bufferInvite');
    }
  }

  getColorForStatus(readyToPlay: any) {
    switch (readyToPlay) {
      case (0):
        return 'blue';
      case (1):
        return '#ffd507';
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
      case null:
        return null;
      default:
        return 'not found';
    }
  }

  checkPlayerRole() {
    if (this.playerRole === PlayerRole.admin) {
      return true;
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timerForUpdateBase);
    clearInterval(this.gameIsReadyInterval);
    this.exampleDatabase.clearRoomStorage();
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


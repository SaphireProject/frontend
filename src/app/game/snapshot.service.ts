import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ISnapshotResponse} from './ISnapshotResponse';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SnapshotService {
  // private snapshotSource = new ReplaySubject<Object>(1);
  // currentMessage = this.snapshotSource.asObservable();
  // private preloadSource = new ReplaySubject<Object>(1);
  // preload = this.snapshotSource.asObservable();
  page: number;
  private countOfRequestingSnapshots = 10;
  idOfRoom: number;


  constructor(private http: HttpClient) {
  }

  // public getSnapshots(idOfRoom: number, numberOfSnapshot?: number): Observable<ISnapshotResponse> {
  //   // check to having info about current state in localStorage
  //   console.log('get snapshot');
  //   console.log(idOfRoom);
  //   console.log(numberOfSnapshot);
  //   if (numberOfSnapshot === undefined) {
  //     numberOfSnapshot = 0;
  //   }
  //   // switch (numberOfSnapshot) {
  //   //   case undefined:
  //   //     console.log('undefinefd');
  //   //     const numberFromLocalStorage = Number(localStorage.getItem('currentSnapshotNumber'));
  //   //     if (numberFromLocalStorage !== 0) {
  //   //       console.log('numberFromLocalStorage !== 0');
  //   //       numberOfSnapshot = numberFromLocalStorage;
  //   //     } else {
  //   //       console.log('numberFromLocalStorage 0');
  //   //       numberOfSnapshot = 0;
  //   //     }
  //   //     break;
  //   // }
  //   // request to snapshot
  //   return this.http.get<ISnapshotResponse>(`${environment.apiUrl2}game`, {
  //     params: {idRoom: `${this.idOfRoom}`, page: `${numberOfSnapshot}`, size: `${this.countOfRequestingSnapshots}`}
  //   }).pipe(map(data => {
  //     console.log('after request from server:');
  //     console.log(data);
  //     return data;
  //   }));
  // }

  public getSnapshots(idOfRoom: number, numberOfSnapshot?: number): Observable<ISnapshotResponse> {
    // check to having info about current state in localStorage
    console.log('get snapshot');
    console.log(idOfRoom);
    console.log('Snapshot number to server' + numberOfSnapshot);
    if (numberOfSnapshot === undefined) {
      numberOfSnapshot = 0;
    }
    // switch (numberOfSnapshot) {
    //   case undefined:
    //     console.log('undefinefd');
    //     const numberFromLocalStorage = Number(localStorage.getItem('currentSnapshotNumber'));
    //     if (numberFromLocalStorage !== 0) {
    //       console.log('numberFromLocalStorage !== 0');
    //       numberOfSnapshot = numberFromLocalStorage;
    //     } else {
    //       console.log('numberFromLocalStorage 0');
    //       numberOfSnapshot = 0;
    //     }
    //     break;
    // }
    // request to snapshot
    // if (numberOfSnapshot !== 0) {
    //   numberOfSnapshot *= 10;
    // }
    return this.http.get<ISnapshotResponse>('http://localhost:3000/game', {
      params: {idRoom: `${10}`, page: `${numberOfSnapshot}`, size: `${this.countOfRequestingSnapshots}`}
    }).pipe(map(data => {
      console.log('after request from server:');
      console.log(data);
      return data[0];
    }));
  }

  // public sendSnapshots(responseSnapshots: any) {
  //   this.snapshotSource.next(responseSnapshots);
  // }
  public getCountOfRequestingSnapshots(): number {
    return this.countOfRequestingSnapshots;
  }

  setIdOfRoom(idOfRoom: number) {
    this.idOfRoom = idOfRoom;
  }

}

import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ISnapshotResponse} from './ISnapshotResponse';

@Injectable({providedIn: 'root'})
export class SnapshotService {
  newSnapshots: [];
  private snapshotSource = new ReplaySubject<Object>(1);
  currentMessage = this.snapshotSource.asObservable();
  private preloadSource = new ReplaySubject<Object>(1);
  preload = this.snapshotSource.asObservable();
  page: number;
  private _countOfRequestingSnapshots = 10;

  constructor(private http: HttpClient) {
  }

  public getSnapshots(numberOfSnapshot?: number): Observable<any> {
    // check to having info about current state in localStorage
    switch (numberOfSnapshot) {
      case undefined:
        const numberFromLocalStorage = Number(localStorage.getItem('currentSnapshotNumber'));
        if (numberFromLocalStorage !== 0) {
          numberOfSnapshot = numberFromLocalStorage;
        } else {
          numberOfSnapshot = 0;
        }
        break;
    }
    // request to snapshot
    return this.http.get<ISnapshotResponse>(`${environment.apiUrl}game`, {
      params: {page: `${numberOfSnapshot}`, size: `${this._countOfRequestingSnapshots}`}
    });
  }


  public sendSnapshots(responseSnapshots: any) {
    this.snapshotSource.next(responseSnapshots);
  }

}

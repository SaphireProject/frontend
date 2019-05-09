import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SnapshotService {
  newSnapshots: [];
  private snapshotSource = new ReplaySubject<Object>(1);
  currentMessage = this.snapshotSource.asObservable();

  constructor() {}

  public sendSnapshots(responseSnapshots: any) {
    this.snapshotSource.next(responseSnapshots);
  }

}

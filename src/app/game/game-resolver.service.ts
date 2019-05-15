import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {ISnapshotResponse} from './ISnapshotResponse';
import {SnapshotService} from './snapshot.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class GameResolver implements Resolve<ISnapshotResponse> {
  constructor(private snapshotService: SnapshotService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISnapshotResponse> |
    Promise<ISnapshotResponse> | ISnapshotResponse {
    return this.snapshotService.getSnapshots().pipe(catchError((err) => {
      console.log('WRNG');
      return throwError(err);
    }));
  }

}

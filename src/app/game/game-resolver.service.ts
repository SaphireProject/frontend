import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {GameComponent} from './game.component';
import {ISnapshotResponse} from './ISnapshotResponse';
import {UserService} from '../_services';
import {SnapshotService} from './snapshot.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class GameResolver implements Resolve<ISnapshotResponse> {
  constructor(private snapshotService: SnapshotService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISnapshotResponse> | Promise<ISnapshotResponse> | ISnapshotResponse {
    return this.snapshotService.getSnapshots().pipe(catchError((err) => {
      console.log('WRNG');
      return throwError(err);
    }));
  }

}

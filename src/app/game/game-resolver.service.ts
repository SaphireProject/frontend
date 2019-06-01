import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {ISnapshotResponse} from './ISnapshotResponse';
import {SnapshotService} from './snapshot.service';
import {catchError, map} from 'rxjs/operators';
import {conditionallyCreateMapObjectLiteral} from '@angular/compiler/src/render3/view/util';

@Injectable()
export class GameResolver implements Resolve<ISnapshotResponse> {
  constructor(private snapshotService: SnapshotService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISnapshotResponse> |
    Promise<ISnapshotResponse> | ISnapshotResponse {
    // const idOfRoom = route.params['id'];
    console.log('improve');
    console.log(route.params['idOfRoom']);
    const idOfRoom = route.params['idOfRoom'];
    console.log('RESOLVER FOR GAME');
    return this.snapshotService.getSnapshots(idOfRoom).pipe(map( data => {
      console.log('data in game resolver was getted');
      console.log(data);
      console.log(data);
      return data;
    }
    ), catchError((err) => {
      console.log('WRNG');
      return throwError(err);
    }));
  }

}

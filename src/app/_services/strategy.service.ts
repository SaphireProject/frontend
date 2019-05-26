import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {UserService} from './user.service';
import {IGetUserStrategiesResponse} from '../_models/game-rooms-models/response/IGetUserStrategiesResponse';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {DataRoomService} from './dataroom.service';

@Injectable({providedIn: 'root'})
export class StrategyService {

  constructor(private http: HttpClient,
              private dataRoomService: DataRoomService) {
  }

  public getStrategiesByUserId(): Observable<IGetUserStrategiesResponse> {
     return this.http.get<IGetUserStrategiesResponse>(`${environment.apiUrl2}user/strategies`,
      {
        params: new HttpParams()
          .set('game', 'codeOfTanks')
      });
  }

  public getStrategyByIdOfStrategy(idOfChosenStrategy: number): Observable<{id: number, name: string, description: string}> {
    return this.http
          .get<{id: number, name: string, description: string}>(`${environment.apiUrl2}user/strategy`,
      {params: new HttpParams()
          .set('idOfChosenStrategy', `${idOfChosenStrategy}`)
      });
  }


}

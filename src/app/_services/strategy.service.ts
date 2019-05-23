import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {UserService} from './user.service';
import {IGetUserStrategiesResponse} from '../_models/game-rooms-models/response/IGetUserStrategiesResponse';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class StrategyService {

  constructor(private http: HttpClient) {
  }

  public getStrategiesByUserId(): Observable<IGetUserStrategiesResponse> {
    // todo chosing game
     return this.http.get<IGetUserStrategiesResponse>(`${environment.apiUrl}strategies`,
      {
        params: new HttpParams()
          .set('game', 'codeOfTanks')
      });
  }

  public getStrategyByIdOfStrategy(idOfChosenStrategy: number): Observable<{id: number, name: string, description: string}> {
    return this.http
          .get<{id: number, name: string, description: string}>(`${environment.apiUrl}strategy`,
      {params: new HttpParams()
          .set('idOfChosenStrategy', `${idOfChosenStrategy}`)
      });
  }


}

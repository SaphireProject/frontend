import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {sha256} from 'js-sha256';
import {environment} from '../../environments/environment';
import {User, UserRegisterRequest, UserEditRequest, QuestionRequest, Profile} from '../_models';
import {IEndOfGame} from '../game/ISnapshotResponse';
import {ICurrentWinner} from '../_helpers/ICurrentWinner';


@Injectable({providedIn: 'root'})
export class UserService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentWinnerSubject: BehaviorSubject<ICurrentWinner>;
  public currentWinner: Observable<ICurrentWinner>;
  private bufferWinnerSubject: ReplaySubject<Object>;
  public bufferWinner: Observable<Object>;

  private passwordWithoutHash: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentWinnerSubject = new BehaviorSubject<ICurrentWinner>({typeOfEnding: 'none', idOfWinner: undefined, user: undefined});
    this.currentWinner = this.currentWinnerSubject.asObservable();
    this.bufferWinnerSubject = new ReplaySubject<Object>(1);
    this.bufferWinner = this.bufferWinnerSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(userRequest: UserRegisterRequest) {
    this.passwordWithoutHash = userRequest.password;
    userRequest.password = sha256(userRequest.password);
    return this.http.post<any>(`${environment.apiUrl}auth/registration`, userRequest)
      .pipe(map(user => {
        console.log('login successful if there\'s a jwt token in the response');
        this.saveCurrentUser(user);
        return user;
      }));
  }

  login(username: string, password: string) {
    password = sha256(password);
    // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    return this.http.post<any>(`${environment.apiUrl}auth/authenticate/generate-token`, {username, password})
      .pipe(map(user => {
        console.log('login successful if there\'s a jwt token in the response');
        this.saveCurrentUser(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /*
  getAll() {
      return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
      return this.http.get(`${environment.apiUrl}/users/${id}`);
  }

  update(user: User) {
      return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  }

  delete(id: number) {
      return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
  */

  editProfile(user: any, passwordEdit: boolean) {
    if (passwordEdit === true) {
      user.passwordOld = sha256(user.passwordOld);
      user.passwordNew = sha256(user.passwordNew);
    } else {
      user.passwordOld = 'null';
      user.passwordNew = 'null';
    }
    console.log(user);
    return this.http.put<any>(`${environment.apiUrl}user/edit`, user)
      .pipe(map(newUser => {
        console.log('login successful if there\'s a jwt token in the response');
        if ((newUser.username !== this.currentUserValue.username) ||
          (newUser.email !== this.currentUserValue.email) ||
          (newUser.token !== this.currentUserValue.token)) {
          this.saveCurrentUser(newUser);
          return user;
        }
      }));
  }

  // getUserProfile() {
  //   return this.http.get<any>(`${environment.apiUrl}user/me`).pipe(map(user => {
  //     return user;
  //   }))
  //     ;
  // }

//   past after user management will be done
//
 getUserProfile(id: number): Observable<any> {
   return this.http.get<any>(`${environment.apiUrl}user/${id}`).pipe(map(
     (data: {profile: Profile}) =>  { console.log(data); return data; }))
     ;
 }

  // updateGlobalProfileData() {
  //   return this.http.get<any>(`${environment.apiUrl}user/me`).pipe(map(user => {
  //     if ((user.username !== this.currentUserValue.username) ||
  //       (user.email !== this.currentUserValue.email)) {
  //       if (user) {
  //         user.token = this.currentUserValue.token;
  //         user.bio = null;
  //         this.saveCurrentUser(user);
  //       }
  //     }
  //   }))
  //     ;
  // }

  private saveCurrentUser(user: User) {
    if (user && user.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log('store user details and jwt token in local storage to keep user logged in between page refreshes');
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }

  getUserByID(id: number) {
    return this.http.get<any>(`${environment.apiUrl}user/${id}`).pipe(map(user => {
      return user;
    }));
  }

  addWinnerOfTheGame(endOfGameInfo: IEndOfGame) {
    if (endOfGameInfo.typeOfEnding === 'win') {
      this.bufferWinnerSubject.next({typeOfEnding: endOfGameInfo.typeOfEnding, id: Number(endOfGameInfo.idOfWinner[0].id)});
      return this.getUserByID(Number(endOfGameInfo.idOfWinner[0].id)).subscribe(data => {
          let typeOfEnding = 'win-other';
          if (data.username === this.currentUserValue.username) {
            typeOfEnding = 'win-me';
          }
          this.currentWinnerSubject.next({typeOfEnding: typeOfEnding, idOfWinner: endOfGameInfo.idOfWinner[0].id, user: data});
        }
      );
    } else {
      this.currentWinnerSubject.next({typeOfEnding: 'drawn', idOfWinner: undefined, user: undefined});
    }
  }

  postQuestion(questionRequest: QuestionRequest) {
    return this.http.post<any>(`${environment.apiUrl}contact`, questionRequest)
      .pipe(map(response => {
        return response;
      }));
  }

  clearWinner() {
    this.currentWinnerSubject.next({typeOfEnding: 'none', idOfWinner: undefined, user: undefined});
  }
}

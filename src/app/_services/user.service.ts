import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sha256 } from 'js-sha256';
import { distinctUntilChanged } from 'rxjs/operators';

import {environment} from '../../environments/environment';
import { User, UserRegisterRequest, UserEditRequest } from '../_models';
import {stringify} from 'querystring';


@Injectable({ providedIn: 'root' })
export class UserService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private passwordWithoutHash: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    console.log('return this.currentUserSubject.value;');
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    password = sha256(password);
    // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    return this.http.post<any>(`${environment.apiUrl}auth/authenticate/generate-token`, { username, password })
      .pipe(map(user => {
        console.log('login successful if there\'s a jwt token in the response');
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('store user details and jwt token in local storage to keep user logged in between page refreshes');
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

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

  register(user: UserRegisterRequest) {
    this.passwordWithoutHash = user.password;
    user.password = sha256(user.password);
    return this.http.post(`${environment.apiUrl}auth/registration`, user);
    this.login(user.username, user.password);
  }

  editProfile(user: UserEditRequest, passwordEdit: boolean) {
    if (passwordEdit === true) {
      user.oldPassword = sha256(user.oldPassword);
      user.password = sha256(user.password);
      return this.http.put(`${environment.apiUrl}user/edit`, user);
    } else {
       user.oldPassword = null;
       user.password = null;
       console.log('rbl')
       return this.http.put(`${environment.apiUrl}user/edit`, user);
    }
  }

  getUserProfile() {
    return this.http.get<any>(`${environment.apiUrl}user/me`).pipe(map(user => {
      if (user) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log('store user details and jwt token in local storage to keep user logged in between page refreshes');
        console.log(user.result);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return user;
    }))
      ;
  }






}

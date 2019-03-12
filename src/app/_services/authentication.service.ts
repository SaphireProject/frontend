﻿/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sha256 } from 'js-sha256';

import {environment} from '../../environments/environment';
import { User } from '../_models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable(); // does distinctUntilChanged need?
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        password = sha256(password);
        // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        return this.http.post<any>(`${environment.apiUrl}auth/authenticate/generate-token`, { username, password })
            .pipe(map(user => {
                console.log('login successful if there\'s a jwt token in the response');
                // if (user && user.token) {
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
}

*/

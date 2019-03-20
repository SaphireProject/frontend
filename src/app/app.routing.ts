﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {ToastrComponent} from './toastr';
import {ProfileComponent} from './profile/profile.component';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {ProfileResolver} from './profile/profile-resolver.service';
import {Profile} from './_models';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'toastr', component: ToastrComponent},
    { path: 'me', component: ProfileComponent, resolve: { profile: ProfileResolver}, canActivate: [AuthGuard]},
    { path: 'me/edit', component: ProfileSettingsComponent, resolve: { profile: ProfileResolver }, canActivate: [AuthGuard]},

// otherwise redirect to home
{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

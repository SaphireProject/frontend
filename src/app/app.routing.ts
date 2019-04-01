import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {ToastrComponent} from './toastr';
import {ProfileComponent} from './profile/profile.component';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {ProfileResolver} from './profile/profile-resolver.service';
import {ContactComponent} from './contact/contact.component';
import {ErrorComponent} from './error/error.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'toastr', component: ToastrComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'error', component: ErrorComponent},
    { path: 'me', component: ProfileComponent, resolve: { profile: ProfileResolver}, canActivate: [AuthGuard]},
    { path: 'me/edit', component: ProfileSettingsComponent, resolve: { profile: ProfileResolver }, canActivate: [AuthGuard]},

// otherwise redirect to home
{ path: '**', redirectTo: '/error?type=404' }
];

export const routing = RouterModule.forRoot(appRoutes);

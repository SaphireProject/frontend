import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {ToastrComponent} from './toastr';
import {ProfileComponent} from './profile/profile.component';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'toastr', component: ToastrComponent},
    { path: 'me', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'me/edit', component: ProfileSettingsComponent, canActivate: [AuthGuard]},

// otherwise redirect to home
{ path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

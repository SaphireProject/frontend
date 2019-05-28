import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard, ConfirmDeactivateGuard} from './_guards';
import {ToastrComponent} from './toastr';
import {ProfileComponent} from './profile/profile.component';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {ProfileResolver} from './profile/profile-resolver.service';
import {ContactComponent} from './contact/contact.component';
import {ErrorComponent} from './error/error.component';
import {GameComponent} from './game/game.component';
import {EndgameComponent} from './endgame/endgame.component';
import {GameResolver} from './game/game-resolver.service';
import {RoomcreatorComponent} from './roomcreator/roomcreator.component';
import {CarouselComponent} from './carousel/carousel.component';
import {RoomComponent} from './room/room.component';
import {SetupforbattleComponent} from './setupforbattle/setupforbattle.component';
import {InvitelistComponent} from './invitelist/invitelist.component';
import {LobbyComponent} from './lobby/lobby.component';
import {ProfileSettingsResolver} from './profile-settings/profile-settings-resolver.service';


const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'toastr', component: ToastrComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'carousel', component: CarouselComponent},
  {path: 'setup', component: SetupforbattleComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: InvitelistComponent, canActivate: [AuthGuard]},
  {path: 'room/:id', component: RoomComponent, canActivate: [AuthGuard]},
  {path: 'lobby', component: LobbyComponent, canActivate: [AuthGuard]},
  {
    path: 'game/:idOfRoom', component: GameComponent, canActivate: [AuthGuard],
    canDeactivate: [ConfirmDeactivateGuard], resolve: {game: GameResolver}
  },
  {path: 'endgame', component: EndgameComponent, canActivate: [AuthGuard]},
  {path: 'create-room', component: RoomcreatorComponent, canActivate: [AuthGuard]},
  {path: 'profile/:id', component: ProfileComponent, resolve: {profile: ProfileResolver}, canActivate: [AuthGuard]},
  {path: 'me/edit', component: ProfileSettingsComponent, resolve: {profile: ProfileSettingsResolver}, canActivate: [AuthGuard]},

// otherwise redirect to home
  {path: '**', redirectTo: '/error?type=404'}
];

export const routing = RouterModule.forRoot(appRoutes);

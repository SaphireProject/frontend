import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { FriendsComponent } from './friends/friends.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'strategies', component: StrategiesComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatProgressBarModule, MatToolbarModule,
  MatSidenavModule, MatListModule, MatStepperModule
} from '@angular/material';
import { NgImageSliderModule } from 'ng-image-slider';
import {GravatarModule} from 'ngx-gravatar';


import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {ToastrComponent} from './toastr/';
import {AlertComponent} from './_components';
import {JwtInterceptor, ServerErrorInterceptor} from './_helpers';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {HeaderComponent} from './nav/header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {MatInputModule, MatIconModule, MatMenuModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProfileComponent} from './profile/profile.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {gravatarConfig} from './_configs/';
import {ProfileResolver} from './profile/profile-resolver.service';
import {SidenavListComponent} from './nav/sidenav-list/sidenav-list.component';
import {ContactComponent} from './contact/contact.component';
import {GlobalErrorHandler} from './_helpers/global-error-handler';
import {ErrorComponent} from './error/error.component';
import {GameComponent} from './game/game.component';
import {ConfirmDeactivateGuard} from './_guards';
import {EndgameComponent} from './endgame/endgame.component';
import {GameResolver} from './game/game-resolver.service';
import { RoomcreatorComponent } from './roomcreator/roomcreator.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatSortModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HighlightModule } from 'ngx-highlightjs';
import java from 'highlight.js/lib/languages/java';
import { CarouselComponent } from './carousel/carousel.component';
import { RoomComponent } from './room/room.component';
import { InviteDialogComponent } from './dialogs/invite-dialog/invite-dialog.component';
import {DataRoomService} from './_services/dataroom.service';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { SetupforbattleComponent } from './setupforbattle/setupforbattle.component';
import { InvitelistComponent } from './invitelist/invitelist.component';
import { GotogameDialogComponent } from './dialogs/gotogame-dialog/gotogame-dialog.component'
;
import { RefusegameDialogComponent } from './dialogs/refusegame-dialog/refusegame-dialog.component';
import {NotificationService} from './_services/notification.service';
import { ShowcodedialogComponent } from './dialogs/showcodedialog/showcodedialog.component';
import { LobbyComponent } from './lobby/lobby.component';;
import { LeaveDialogComponent } from './dialogs/leave-dialog/leave-dialog.component'
import {ProfileSettingsResolver} from './profile-settings/profile-settings-resolver.service';


@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    MatPasswordStrengthModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    NgImageSliderModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatInputModule,
    MatBadgeModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSliderModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatStepperModule,
    MatMenuModule,
    MatListModule,
    SlideshowModule,
    GravatarModule.forRoot(gravatarConfig),
    routing],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ToastrComponent,
    ProfileComponent,
    ProfileSettingsComponent,
    SidenavListComponent,
    ContactComponent,
    ErrorComponent,
    GameComponent,
    RoomcreatorComponent,
    CarouselComponent,
    RoomComponent,
    InviteDialogComponent,
    DeleteDialogComponent,
    LeaveDialogComponent,
    SetupforbattleComponent,
    InvitelistComponent,
    RefusegameDialogComponent,
    GotogameDialogComponent,
    ShowcodedialogComponent,
    LobbyComponent,
    EndgameComponent],
  entryComponents: [
    InviteDialogComponent,
    DeleteDialogComponent,
    RefusegameDialogComponent,
    GotogameDialogComponent,
    ShowcodedialogComponent,
    LeaveDialogComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    ProfileResolver,
    ProfileSettingsResolver,
    GameResolver,
    ConfirmDeactivateGuard,
    DataRoomService,
    NotificationService

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}
export function hljsLanguages() {
  return [
    {name: 'java', func: java},
  ];
}

﻿import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {
  MatButtonModule, MatCardModule, MatExpansionModule, MatProgressBarModule, MatToolbarModule,
  MatSidenavModule, MatListModule
} from '@angular/material';
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
import {FlexLayoutModule} from '@angular/flex-layout';
import {ProfileComponent} from './profile/profile.component';
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


@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPasswordStrengthModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
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
    EndgameComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    ProfileResolver,
    GameResolver,
    ConfirmDeactivateGuard

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

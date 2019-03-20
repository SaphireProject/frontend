import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatPasswordStrengthComponent} from '@angular-material-extensions/password-strength';

import { AlertService, UserService } from '../_services';
import {MustMatch} from '../_helpers/';
import {maxLines} from '../_helpers/max-lines';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {User} from '../_models';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  loading = false;
  passwordEdit = false;
  currentUserSubscription: Subscription;
  currentUser: User;
  showingPasswordValid = false;
  strength: number;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    console.log(this.currentUser.username);
    console.log();
    this.userForm = this.formBuilder.group({
      email: [(this.currentUser.email != null) ? (this.currentUser.email) : '', [Validators.required, Validators.email, Validators.email]],
      username: [(this.currentUser.username != null) ? (this.currentUser.username) : '', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]],
      oldPassword: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
      bio: [(this.currentUser.bio != null) ? (this.currentUser.bio) : '', maxLines(2)]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }


  getEmailErrorMessage() {
    return this.f.email.hasError('required') ? 'Email is required' :
      this.f.email.hasError('email') ? 'Email is not correct' :
        '';
  }
  getUserErrorMessage() {
    return this.f.username.hasError('required') ? 'User is required' :
      this.f.username.hasError('maxlength') ? 'Ooops, username is so big! It must be less than 50 characters' :
        '';
  }
  getPasswordErrorMessage() {
    return this.f.password.hasError('required') ? 'Password is required' :
      this.f.password.hasError('pattern') ? 'Password is not strong :(' :
        this.f.password.hasError('maxlength') ? 'Password must be less than 50 characters' :
        '';
  }
  getOldPasswordMessage() {
    return this.f.oldPassword.hasError('required') ? 'Old password is required' :
        '';
  }
  getConfirmPasswordErrorMessage() {
    return this.f.confirmPassword.hasError('required') ? 'Password needs to be confirmed' :
      this.f.confirmPassword.hasError('mustMatch') ? 'Passwords must match(' :
        '';
  }

  editPassword() {
    this.passwordEdit = !this.passwordEdit;
  }

  toggleOnPasswordInput() {
    this.showingPasswordValid = true;
  }

  onStrengthChanged(strength: number) {
    this.strength = strength;
    console.log('password strength = ', strength);
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if ((((this.f.email.invalid) || (this.f.username.invalid)) && (this.passwordEdit === false)) ||
          ((this.userForm.invalid) && (this.passwordEdit === true)) ||
            (this.f.bio.invalid)) {
      this.alertService.error('Please, enter correct info about you');
      console.log('first valid');
      return;
    }

  //  if ((this.userForm.invalid) && (this.passwordEdit === true)) {
  //    console.log('second valid');
  //    return;
  //  }
//
  //  if (this.f.bio.invalid) {
  //    return;
  //  }

    this.loading = true;



    this.userService.editProfile(this.userForm.value, this.passwordEdit)
      .pipe(first())
      .subscribe(
        data => {
          console.log('data');
          this.alertService.success('Profile was saved', true);
          this.router.navigate(['/me']);
        },
        error => {
          console.log('error in editing');
          this.alertService.error(error);
          this.loading = false;
        });


    this.loading = true;
    console.log('norm');
}
}

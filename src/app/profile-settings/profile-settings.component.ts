import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import {MatPasswordStrengthComponent} from '@angular-material-extensions/password-strength';

import { AlertService, UserService } from '../_services';
import {MustMatch} from '../_helpers/';
import {maxLines} from '../_helpers/';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, tap} from 'rxjs/operators';
import {Profile} from '../_models';

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
  showingPasswordValid = false;
  strength: number;
  profile: Profile;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.pipe(tap(
      ((data: { profile: Profile }) => {
        this.profile = data.profile;
      }
      ))).subscribe();

    this.userForm = this.formBuilder.group({
      email: [(this.profile.email != null) ? (this.profile.email) : '', [Validators.required, Validators.email, Validators.email]],
      username: [(this.profile.username != null) ? (this.profile.username) : '', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]],
      oldPassword: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
      bio: [(this.profile.bio != null) ? (this.profile.bio) : '', maxLines(2)]
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

    const requestToEdit = {bio: this.userForm.value.bio,
      email: this.userForm.value.email,
      passwordNew: this.userForm.value.password,
      passwordOld: this.userForm.value.oldPassword,
      username: this.userForm.value.username};
    console.log('requsettoedit');
    console.log(requestToEdit);

    this.userService.editProfile(requestToEdit, this.passwordEdit)
      .pipe(first())
      .subscribe(
        () => {
          console.log('data');
          this.alertService.success('Profile was saved', true);
          this.router.navigate(['profile/me']);
        },
        () => {
          this.loading = false;
        });


    this.loading = true;
    console.log('norm');
}
}

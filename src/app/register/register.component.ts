import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, UserService} from '../_services';
import {MustMatch} from '../_helpers/';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  showPasswordValid = false;
  strength: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
  ) {
    // redirect to home if already logged in
    if (this.userService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.email]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$')]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }


  togglePasswordInput() {
    this.showPasswordValid = true;
  }

  checkForCheckStatusIcon(control: AbstractControl) {
    if (!control.errors && (control.touched || this.submitted)) {
      return true;
    }
  }

  checkForErrorStatusIcon(control: AbstractControl) {
    if (control.errors && (control.touched || this.submitted)) {
      return true;
    }
  }

  checkForValidField(control: AbstractControl) {
    if (control.valid && control.touched) {
      return true;
    }
  }

  checkForInvalidField(control: AbstractControl) {
    if (control.errors && (control.touched || this.submitted)) {
      return true;
    }
  }

  checkForFieldRequired(control: AbstractControl) {
    if (!control.errors.required) {
      return true;
    }
  }

  checkForMaxLength(control: AbstractControl) {
    if (!control.errors.maxlength) {
      return true;
    }
  }

  onStrengthChanged(strength: number) {
    this.strength = strength;
    console.log('password strength = ', strength);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if ((this.registerForm.invalid) || ((this.strength) < 100)) {
      this.alertService.error('Please, enter correct info about you');
      return;
    }


    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/']);
        },
        () => {
          this.loading = false;
        });
  }
}

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import {MatPasswordStrengthComponent} from '@angular-material-extensions/password-strength';


import { AlertService, UserService, AuthenticationService } from '../_services';
import {MustMatch} from '../_helpers/';

@Component({templateUrl: 'register.component.html',
            styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    condition = false;
    signInReset = false;
    strength: number;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
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

    toggle() {
      this.condition = true;
    }

    checkForCheckStatusIcon(control: FormControl) {
      if (!control.errors && (control.touched || this.submitted)) {
        return true;
      }
    }
    checkForErrorStatusIcon(control: FormControl) {
      if (control.errors && (control.touched || this.submitted)) {
        return true;
      }
    }
    checkForValidField(control: FormControl) {
      if (control.valid && control.touched) {
        return true;
      }
    }
  checkForInvalidField(control: FormControl) {
    if (control.errors && (control.touched || this.submitted)) {
      return true;
    }
  }
  checkForFieldRequired(control: FormControl) {
      if (!control.errors.required) {
        return true;
      }
  }
  checkForMaxLength(control: FormControl) {
      if (!control.errors.maxlength) {
        return true;
      }
  }

  onStrengthChanged(strength: number) {
      this.strength = strength;
    console.log('password strength = ', strength);
  }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        if ((this.strength) < 100) {
            return;
      }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

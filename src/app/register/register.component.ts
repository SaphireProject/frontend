import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
            password: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validators: MustMatch('password', 'confirmPassword')
        });
    }

    toggle() {
      this.condition = true;
    }

    signIn() {
      console.log(this.signInReset);
      this.signInReset = true;
      console.log(this.signInReset);
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

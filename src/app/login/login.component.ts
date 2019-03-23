import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService} from '../_services';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.userService.currentUserValue) {
          this.router.navigate(['/']);
        }
      console.log('cosntructor LoginComp');
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.alertService.error('Please, enter correct info about you');
            return;
        }

        this.loading = true;

        this.userService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Hello, ' + this.f.username.value + '!');
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                  console.log('authenticationService.login.pipe.subscribe data error');
                  console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

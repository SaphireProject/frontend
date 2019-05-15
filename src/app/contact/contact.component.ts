import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService, UserService} from '../_services';
import {first} from 'rxjs/operators';
import { Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  contactForm: FormGroup;
  submitted = false;
  loading = false;
  email: string;
  currentUserSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      if (user != null) {
        this.email = user.email;
      }
    });
  }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
        email: [this.email != null ? this.email : '', [Validators.required, Validators.email]],
        firstName: [undefined, [Validators.maxLength(50), Validators.required]],
        lastName: [undefined, [Validators.maxLength(50)]],
        questionToContact: [undefined, [Validators.required, Validators.maxLength(1000)]]
      }
    )
    ;
  }

  get f() {
    return this.contactForm.controls;
  }

  getEmailErrorMessage() {
    return this.f.email.hasError('required') ? 'Email is required' :
      this.f.email.hasError('email') ? 'Email is not correct' :
        '';
  }
  getFirstNameMessage() {
    return this.f.firstName.hasError('required') ? 'First Name is required' : this.f.firstName.hasError('maxlength');
  }
  getQuestionErrorMessage() {
    return this.f.questionToContact.hasError('required') ? 'Please, enter your ask' :
      this.f.questionToContact.hasError('maxlength') ? 'Oops, please enter text with less than 1000 characters' : '';
  }


  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      this.alertService.error('Please, enter correct information');
      return;
    }
    this.loading = true;

    this.userService.postQuestion(this.contactForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.success('Thanks for asking! We will answer you as soon as possible' );
          this.router.navigate(['/']);
        },
        () => {
          this.loading = false;
        }
        )
    ;
    this.loading = true;
  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}

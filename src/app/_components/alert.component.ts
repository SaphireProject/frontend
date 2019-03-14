import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService, ToastrService } from '../_services';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService,
                private toastrService: ToastrService,
                ) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
          if (message != null) {
            this.message = message;
            this.toastrService.makeToastr(message);
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

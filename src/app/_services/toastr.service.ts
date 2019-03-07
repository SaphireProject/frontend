import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
import {ToastrComponent} from '../toastr/toastr.component';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  typeMessage: string;
  icon: string;
  cssClass: string;
  constructor(private snackBar: MatSnackBar) { }

  makeToastr(message: any) {
    this.typeMessage = message.type;
    if (message.type === 'check') {
      this.icon = 'check';
    } else {
      if (message.type === 'alert-danger') {
        this.icon = 'warning';
      } else {
        if (message.type === 'error') {
          this.icon = 'error';
        }
      }
    }
    this.cssClass = message.type;
    this.snackBar.openFromComponent(ToastrComponent, {
      data: {
        message: message.text,
        icon: this.icon,
      },
      duration: 2000,
      panelClass: [this.cssClass]
    });
  }
}

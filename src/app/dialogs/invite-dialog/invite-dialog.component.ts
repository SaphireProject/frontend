import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataRoomService} from '../../_services/dataroom.service';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css']
})
export class InviteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InviteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {username: string},
              public dataRoomService: DataRoomService) { }

  formControl = new FormControl('', [
    Validators.required, Validators.maxLength(50), Validators.email
    // Validators.email,
  ]);

  ngOnInit() {
  }

  submit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log('add');
    this.dataRoomService.addUser(this.data.username);
  }
}

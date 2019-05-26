import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataRoomService} from '../../_services/dataroom.service';
import {maxLines, MustMatch} from '../../_helpers';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css']
})
export class InviteDialogComponent implements OnInit {
  inviteForm: any;

  constructor(public dialogRef: MatDialogRef<InviteDialogComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: {username: string},
              public dataRoomService: DataRoomService) { }


  // formControl = new FormControl('', [
  //   Validators.required, Validators.maxLength(50), Validators.email
  //   // Validators.email,
  // ]);

  ngOnInit() {
    this.inviteForm = this.formBuilder.group({
      formControl: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  submit() {
  }

  getErrorMessage() {
    return this.inviteForm.controls.formControl.hasError('required') ? 'Required field' :
      this.inviteForm.controls.formControl.hasError('maxLength') ? 'Not a valid email' :
        '';
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log('ПРОВЕРКА');
    console.log(this.inviteForm.value.formControl);
    this.dataRoomService.addUser(this.inviteForm.value.formControl);
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataRoomService} from '../../_services/dataroom.service';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-gotogame-dialog',
  templateUrl: './gotogame-dialog.component.html',
  styleUrls: ['./gotogame-dialog.component.css']
})
export class GotogameDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GotogameDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {idOfInvite: string},
              public notificationService: NotificationService) { }

  ngOnInit() {
  }

  confirmGame() {
    console.log('Ok');
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

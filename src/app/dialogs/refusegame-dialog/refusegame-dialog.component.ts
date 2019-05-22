import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataRoomService} from '../../_services/dataroom.service';
import {NotificationService} from '../../_services/notification.service';

@Component({
  selector: 'app-refusegame-dialog',
  templateUrl: './refusegame-dialog.component.html',
  styleUrls: ['./refusegame-dialog.component.css']
})
export class RefusegameDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RefusegameDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public notificationService: NotificationService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmRefuse(): void {
    this.notificationService.deleteInvite(this.data.idOfInvite);
  }
}

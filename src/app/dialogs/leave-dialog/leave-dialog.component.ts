import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataRoomService} from '../../_services/dataroom.service';

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './leave-dialog.component.html',
  styleUrls: ['./leave-dialog.component.css']
})
export class LeaveDialogComponent {

  constructor(public dialogRef: MatDialogRef<LeaveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataRoomService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    console.log(this.data);
  }


}

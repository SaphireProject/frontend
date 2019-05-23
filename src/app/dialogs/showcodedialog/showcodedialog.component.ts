import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataRoomService} from '../../_services/dataroom.service';

@Component({
  selector: 'app-showcodedialog',
  templateUrl: './showcodedialog.component.html',
  styleUrls: ['./showcodedialog.component.css']
})
export class ShowcodedialogComponent {

  constructor(public dialogRef: MatDialogRef<ShowcodedialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

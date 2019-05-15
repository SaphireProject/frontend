import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';


@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ToastrComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}

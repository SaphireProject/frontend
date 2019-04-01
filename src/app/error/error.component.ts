import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ErrorDescrpiption} from '../_configs/';
import {errorMap} from '../_configs/error-descrpiption';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  routeParams: Params;
  typeOfError: String;
  pageInfo: ErrorDescrpiption;

  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeParams = this.activatedRoute.snapshot.queryParams;
    this.typeOfError = this.routeParams.type;
    if (errorMap.has(this.typeOfError)) {
      this.pageInfo = errorMap.get(this.typeOfError);
    } else {
      this.pageInfo = errorMap.get('404');
    }
    console.log(this.pageInfo.typeOfError);
  }

}

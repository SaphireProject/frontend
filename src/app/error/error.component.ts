import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ErrorDescrpiption} from '../_configs/';
import {errorMap} from '../_configs/';

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
    this.activatedRoute.queryParamMap.subscribe(params => {
      console.log('Type of error: ' + params.get('type'));
      this.typeOfError = params.get('type');
      if (errorMap.has(this.typeOfError)) {
        this.pageInfo = errorMap.get(this.typeOfError);
      } else {
        this.pageInfo = errorMap.get('404');
      }
    });
  }
}

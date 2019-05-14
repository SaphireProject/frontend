import {Component, OnDestroy, OnInit} from '@angular/core';
import {quotesWin, quotesLoose} from '../_configs/quotes-description';
import {UserService} from '../_services';
import {Subscription} from 'rxjs';
import {endgameMap, IEndgameDescription} from '../_configs/';
import {Router} from '@angular/router';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.css']
})
export class EndgameComponent implements OnInit, OnDestroy {
  quoteMessage: string;
  infoAboutWinner$: Subscription;
  typeOfEnding: string;
  username: string;
  email: string;
  userId: number;
  pageInfo: IEndgameDescription;
  statusEnd: string;

  constructor(private userService: UserService,
              private router: Router) {
    this.infoAboutWinner$ = userService.currentWinner.subscribe(data => {
        // if ((data.typeOfEnding === 'none') || (data.typeOfEndung === undefined)) {
        //         userService.bufferWinner.pipe(first()).subscribe(bufferData => {
        //         });
        if (endgameMap.has(data.typeOfEnding)) {
          this.pageInfo = endgameMap.get(data.typeOfEnding);
          console.log(this.pageInfo);
          if ((this.pageInfo.typeOfEndgame === 'win-me') || (this.pageInfo.typeOfEndgame === 'win-other')) {
            this.username = data.user.username;
            this.email = data.user.email;
          }
        } else {
          router.navigate(['/error?type=404']);
        }

        // console.log('endgame');
        // console.log(endgameMap);
        // console.log(data);
        // this.statusEnd = data.typeOfEnding;
        // console.log(this.statusEnd);
        // if (endgameMap.has(this.statusEnd)) {
        //
        //
        //
        //
        //
        // } else {
        //   router.navigate(['/error?type=404']);
        // }
      }
    );
  }

  ngOnInit() {
    if (this.pageInfo.typeOfEndgame === 'win-me') {
    this.quoteMessage = quotesWin[Math.round(0 - 0.5 + Math.random() * (quotesWin.length))];
    } else {
      this.quoteMessage = quotesLoose[Math.round(0 - 0.5 + Math.random() * (quotesLoose.length))];
      console.log('Цитата');
      console.log(this.quoteMessage);
    }
  }

  ngOnDestroy(): void {
    this.infoAboutWinner$.unsubscribe();
    this.userService.clearWinner();
  }

}

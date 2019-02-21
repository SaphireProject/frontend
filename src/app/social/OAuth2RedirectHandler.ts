// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// @Component({
//     selector: 'app-oauth2redirecthandler',
//     template: '<h2>This is OAuth2RedirectHandler page.</h2>'
// })
// export class OAuth2RedirectHandlerComponent implements OnInit {
//     private token = '';
//     private error = '';
//     constructor(private route: ActivatedRoute,
//                 private router: Router) { }
//
//     ngOnInit() {
//         this.token = this.route.snapshot.queryParamMap.get('token');
//         this.error = this.route.snapshot.queryParamMap.get('error');
//         if (this.token !== null) {
//             console.log(this.token);
//             this.authService.authChange.next(true);
//             this.tokenStorage.saveToken(this.token);
//             this.userService.saveUserProfile();
//             this.router.navigate(['/welcome']);
//         } else {
//             console.log('Social login failed: ', this.error);
//             this.authService.authChange.next(false);
//             this.router.navigate(['/login']);
//         }
//     }
// }

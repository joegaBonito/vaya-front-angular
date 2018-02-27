import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { GnbService } from './service/gnb.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../login/store/auth.reducer';
import * as AuthActions from '../login/store/auth.action';

@Component({
  selector: 'app-gnb',
  templateUrl: './gnb.component.html',
  styleUrls: ['./gnb.component.css']
})
export class GnbComponent implements OnInit {
  innerWidth:any;
  show:boolean = false;
  showLoginMobile:boolean = false;
  showLoginDesktop:boolean = false;
  isAuthenticated:Observable<boolean>;
  isAdmin:Observable<boolean>;
  emailJson:any=JSON;
  authenticatedEmail:Observable<string>;
  authenticatedId:string;
  authState:Observable<fromAuth.State>;

  constructor(private router:Router,
              private loginService:LoginService,
              private flashMessagesService:FlashMessagesService,
              private gnbService:GnbService,
              @Inject(PLATFORM_ID) private platformId:Object,
              private store:Store<fromApp.AppState>) {
  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      //Gets the resolution width of the screen on load.
      this.innerWidth = window.innerWidth;
      if(this.innerWidth < 992) {
        this.show = false;
        this.showLoginDesktop = true;
        this.showLoginMobile = false;
      } else {
        this.show=true;
        this.showLoginDesktop = false;
        this.showLoginMobile = true;
      }
      //this.checkAuthenticationStatus();
      this.authState = this.store.select('auth');
    } else {
      //Server Only Code
    }
  }

  //Gets the resolution width of the screen on resize.
  onResize(event) {
   this.innerWidth = event.target.innerWidth;
   if (this.innerWidth < 992) {
      this.show = false;
      this.showLoginDesktop = true;
      this.showLoginMobile = false;
   } else {
     this.show = true;
     this.showLoginDesktop = false;
     this.showLoginMobile = true;
   }
}

  //Toggle GNB if the resolution is below 992px
  toggleCollapse() {
    if(this.innerWidth < 992){
      this.show = !this.show;
    }
  }

  //Make 'show' false on clicking the logo if the resolution is below 992px
  onClickLogo() {
    if(this.innerWidth < 992)
      this.show = false;
    this.checkAuthenticationStatus();
  }

  signOut() {
    localStorage.removeItem('token');
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
    this.flashMessagesService.show('Log out Successful!',{cssClass:'alert-danger',timeout:1000});
  }

  /*
  * The function 'this.loginService.isAuthenticatedCurrent' is called to share the authenticated state between
  * the GNB component and the Login Component.
  */
  checkAuthenticationStatus(){
    this.isAuthenticated = this.loginService.isAuthenticatedCurrent;
    this.loginService.onCheckAdmin().subscribe((res) => {
      this.loginService.changeAdminStatus(res);
      this.isAdmin = this.loginService.isAdminCurrent;
    });
    this.loginService.getUsername();
    this.authenticatedEmail = this.loginService.isCurrentUserName;
    this.loginService.findUserId().do(res => { this.authenticatedId = res }).subscribe();
  }
}

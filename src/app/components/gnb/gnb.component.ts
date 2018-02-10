import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { GnbService } from './service/gnb.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

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
  isAuthenticated:boolean = false;
  isAdmin:boolean  = false;
  authenticatedEmail:string;
  authenticatedId:string;

  constructor(private router:Router,
              private loginService:LoginService,
              private flashMessagesService:FlashMessagesService,
              private gnbService:GnbService,
              @Inject(PLATFORM_ID) private platformId:Object) {
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
      this.checkAuthenticationStatus();
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
    this.isAuthenticated = false;
    this.isAdmin = false;
    window.location.href="/";
    // this.router.navigate(['/']);
    // this.flashMessagesService.show('Log out Successful!',{cssClass:'alert-danger',timeout:1000});
  }

/*
 * The function 'this.loginService.isAuthenticatedCurrent' is called to share the authenticated state between
 * the GNB component and the Login Component.
 */
  checkAuthenticationStatus() {
    this.loginService.isAuthenticatedCurrent.subscribe(isAuthenticated=>{
      this.isAuthenticated = isAuthenticated;
      this.onCheckAdmin();
      this.authenticatedEmail = this.loginService.getUsername();
      this.loginService.findUserId().do(res=>{this.authenticatedId = res}).subscribe();
    });
  }

  onCheckAdmin(){
    this.gnbService.onCheckAdmin()
    .map((res) => {
      if(res == true) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    })
    .subscribe();
  }

  editUserInfo() {
    //console.log("Button is clicked");
    
  }
}

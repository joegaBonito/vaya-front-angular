import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';
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

  constructor(private router:Router,
    private loginService:LoginService,
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
      if(localStorage.getItem('token')) {
          this.isAuthenticated = true;
      }else{
          this.isAuthenticated = false;
      }
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
   this.checkAuthenticationStatus();
}
  //Toggle GNB if the resolution is below 992px
  toggleCollapse() {
    if(this.innerWidth < 992){
      this.show = !this.show;
    }
    this.checkAuthenticationStatus();
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
    this.router.navigate(['/']);
  }

  checkAuthenticationStatus() {
    if(localStorage.getItem('token')) {
        this.isAuthenticated = true;
    }else{
        this.isAuthenticated = false;
    }
  }
}

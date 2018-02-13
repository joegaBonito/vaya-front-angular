import { Component, OnInit, Output } from '@angular/core';
import {Member} from './model/Member';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from './service/login.service';
import { EventEmitter } from '@angular/core';
import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';
import { GnbService } from '../gnb/service/gnb.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  member:Member = new Member();
  token:any;
  isAuthenticated:boolean;

  constructor(private router:Router,
              private flashMessagesService:FlashMessagesService,
              private loginService:LoginService,
              private gnbService:GnbService) { }

  ngOnInit() {
    //Shares the authenticated state between GNB Component and LoginComponent.
    this.loginService.isAuthenticatedCurrent.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    })
  }

  onSubmit({value,valid}:{value:Member, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['LoginComponent']);
      this.loginService.changeAuthenticationStatus(false);
      this.loginService.changeAdminStatus(false);
      this.loginService.getUsername();
    } else {
      this.loginService.login(value.email,value.password).map((res)=>{
        //-Save the JWT token in local storage. localStorage is object available on windows, so it does not have to be imported.
        localStorage.setItem('token',res.token);
        this.loginService.getUsername();
        this.loginService.changeAuthenticationStatus(true);
        this.loginService.onCheckAdmin().map((res)=> {
            this.loginService.changeAdminStatus(res);
        });
        this.router.navigate(['/']);
        this.flashMessagesService.show('Log In Successful!', {cssClass:'alert-success',timeout:3000});
        //window.location.href = "/";
        return Observable.of({});
      })
      .subscribe();
    }
  }

}

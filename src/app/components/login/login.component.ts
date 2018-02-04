import { Component, OnInit, Output } from '@angular/core';
import {Member} from './model/Member';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from './service/login.service';
import { EventEmitter } from '@angular/core';

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
              private loginService:LoginService) { }

  ngOnInit() {
    //Shares the authenticated state between GNB Component and LoginComponent.
    this.loginService.isAuthenticatedCurrent.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    })
  }

  onSubmit({value,valid}:{value:Member, valid:boolean}) {
    if(!valid) {
      // this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['LoginComponent']);
      this.loginService.changeAuthenticationStatus(false);
    } else {
      this.loginService.login(value.email,value.password).map((res)=>{
        //-Save the JWT token in local storage. localStorage is object available on windows, so it does not have to be imported.
        localStorage.setItem('token',res.token);
        // this.router.navigate(['/']);
        window.location.href = "/";
        //this.flashMessagesService.show('Log In Successful!',{cssClass:'alert-success',timeout:3000});
      }).subscribe();
      this.loginService.changeAuthenticationStatus(true);
    }
  }

}

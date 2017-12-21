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

  constructor(private router:Router,
              private flashMessagesService:FlashMessagesService,
              private loginService:LoginService) { }

  ngOnInit() {
  }

  onSubmit({value,valid}:{value:Member, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:2000});
      this.router.navigate(['LoginComponent']);
    } else {
      this.loginService.login(value.email,value.password).subscribe((res)=>{
        //-Save the JWT token in local storage. localStorage is object available on windows, so it does not have to be imported.
        localStorage.setItem('token',res.token);
          this.flashMessagesService.show('Log In Successful!',{cssClass:'alert-success',timeout:2000});
        this.router.navigate(['/']);

      });
    }
  }

}

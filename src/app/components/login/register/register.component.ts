import { Component, OnInit } from '@angular/core';
import { Member } from '../model/Member';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  member:Member = new Member();

  constructor(private router:Router,
              private flashMessagesService:FlashMessagesService,
              private loginService:LoginService) { }

  ngOnInit() {
  }

  onSubmit({value,valid}:{value:Member,valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['RegisterComponent']);
    } else {
      this.loginService.createMember(value.email,value.name,value.password).subscribe(()=>{
        this.router.navigate(['/LoginComponent']);
        this.flashMessagesService.show('Register Successful!',{cssClass:'alert-success',timeout:3000});
      });
    }
  }

}

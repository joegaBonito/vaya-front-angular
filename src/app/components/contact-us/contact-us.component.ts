import { Component, OnInit } from '@angular/core';
import { Email } from './model/Email';
import {Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ContactUsService } from './service/contact-us.service';
import { NgProgress } from 'ngx-progressbar';
import { ProgressBarComponent } from 'ngx-progressbar/src/components/progress-bar.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  [x: string]: any;
  email:Email;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private flashMessagesService:FlashMessagesService,
              private contactUsService:ContactUsService,
              private ngProgress:NgProgress) { 
              
              }

  ngOnInit() {
    this.email = new Email();
  }

  onSubmit({value,valid}:{value:Email, valid:boolean}) {
    if(!valid) {
      window.scrollTo(0, 0);
      this.flashMessagesService.show('Something went wrong... Please try again!', {cssClass:'alert-danger', timeout:3000});
      //window.alert('Something went wrong... Please try again!');
    } else {
      this.ngProgress.start();
      window.scrollTo(0, 0);
      this.flashMessagesService.show('Email has been sent',{cssClass:'alert-success',timeout:3000});
      this.contactUsService.sendEmail(value)
      .subscribe(() => {
        this.ngProgress.done();
      });
    }
  }
}

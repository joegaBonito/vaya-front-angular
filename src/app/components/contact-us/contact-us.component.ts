import { Component, OnInit } from '@angular/core';
import { Email } from './model/Email';
import {Router, ActivatedRoute} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ContactUsService } from './service/contact-us.service';

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
              private contactUsService:ContactUsService) { 
                
              }

  ngOnInit() {
    this.email = new Email();
  }

  onSubmit({value,valid}:{value:Email, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      window.scrollTo(0, 0);
    } else {
      this.contactUsService.sendEmail(value).map(()=>{
        this.flashMessagesService.show('Email has been sent',{cssClass:'alert-success',timeout:3000});
        this.contactUsForm.reset();
        window.scrollTo(0, 0);
      })
      .subscribe();
    }
  }

}

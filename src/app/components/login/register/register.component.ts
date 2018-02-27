import { Component, OnInit } from '@angular/core';
import { Member } from '../model/Member';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthAction from '../store/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  member: Member = new Member();

  constructor(private router: Router,
    private flashMessagesService: FlashMessagesService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: Member, valid: boolean }) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in all required fields', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['RegisterComponent']);
    } else {
      /**
       * Below code is using @Ngrx for signup. 
       */
      const username = value.email;
      const name = value.name;
      const password = value.password;
      this.store.dispatch(new AuthAction.TrySignup({ username, name, password }));
      this.router.navigate(['/']);
      this.flashMessagesService.show('Register Successful!', { cssClass: 'alert-success', timeout: 3000 });
    }
  }

}

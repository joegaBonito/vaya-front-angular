import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './components/login/store/auth.action';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor( @Inject(PLATFORM_ID) private platformId:Object,
              private store:Store<fromApp.AppState>) {

  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
    let token = window.localStorage.getItem('token');
    this.store.dispatch(new AuthActions.CheckAuthState(token));
    }
    else{
      
    }
  }
}

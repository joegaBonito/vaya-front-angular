import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './components/login/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private store:Store<fromApp.AppState>) {

  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    this.store.dispatch(new AuthActions.CheckAuthState(token));
  }
}

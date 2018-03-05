import { Injectable, Output } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../login/store/auth.action';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  isAuthenticated:boolean = false;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>) {
   
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    /**
     * The code below uses @Ngrx to check the authentication state.
     */
    this.store.select('auth').take(1).do((res) => {
      //console.log(res);
      this.isAuthenticated = res.authenticated;
      if(res.authenticated == false || res.isGuest == true) {
        this.router.navigate(['/LoginComponent']);
      }
    }).subscribe();
    
    return this.isAuthenticated;
  };

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}

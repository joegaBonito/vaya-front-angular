import { Injectable, Output } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/service/login.service';
import { Router } from '@angular/router';

/*
 * This guard checks for GNB Login status when auth.guard is not in use.
*/
@Injectable()
export class GnbStatusGuard implements CanActivate {
  isAuthenticated: boolean;
  constructor(private loginService: LoginService,
    private router: Router) {
      //Shares the authenticated state between GNB Component and LoginComponent.
      this.loginService.isAuthenticatedCurrent.subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //'map' is used instead of 'subscribe' because 'map' is to assign values and 'subscribe' is to execute them.
    //For the reason, this now finally fixed the GNB first click issue.
      return this.loginService.getAuthentication().map((token) => {
        if (!token) {
          this.loginService.changeAuthenticationStatus(false);
        } else {
          this.loginService.changeAuthenticationStatus(true);
        }
        return true;
      });
    }
}

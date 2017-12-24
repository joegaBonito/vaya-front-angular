import { Injectable, Output } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/service/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuthenticated:boolean;
  constructor (private loginService:LoginService,
               private router:Router) {

  }

  ngOnInit() {
    //Shares the authenticated state between GNB Component and LoginComponent.
    this.loginService.isAuthenticatedCurrent.subscribe((isAuthenticated)=>{
      this.isAuthenticated = isAuthenticated;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //'map' is used instead of 'subscribe' because 'map' is to assign values and 'subscribe' is to execute them.
      //For the reason, this now finally fixed the GNB first click issue.
      return this.loginService.getAuthentication().map((token) => {
        if(!token) {
          this.isAuthenticated = false;
          this.loginService.changeAuthenticationStatus(false);
          this.router.navigate(['/LoginComponent']);
        } else {
          this.isAuthenticated = true;
          this.loginService.changeAuthenticationStatus(true);
        }
        return this.isAuthenticated;
      });
  }
}

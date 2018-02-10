import { Injectable, Output } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';


@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginService, private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     return this.loginService.onCheckAdmin().map((isAdmin) => {
       //console.log(isAdmin);
        if(!isAdmin) {
        this.router.navigate(['/']);
        }  
        return isAdmin;
        });
    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route,state);
      }
}

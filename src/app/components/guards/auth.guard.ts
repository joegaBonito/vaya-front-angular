import { Injectable, Output } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/service/login.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  isAuthenticated:boolean = true;
  constructor (private loginService:LoginService,
               private router:Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.loginService.getAuthentication().subscribe((token) => {
        if(!token) {
          this.isAuthenticated = false;
          this.router.navigate(['/LoginComponent']);
        } else {
          this.isAuthenticated = true;
        }
      });
      return this.isAuthenticated;
  }
}

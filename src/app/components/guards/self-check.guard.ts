import { Injectable, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot,  } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';


@Injectable()
export class SelfCheckGuard implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginService, 
    private router: Router, 
    private route:ActivatedRoute,
    private flashMessagesService:FlashMessagesService){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return this.loginService.onSelfCheck(next.params['id']).map((isSelf:boolean) => {
                if (!isSelf) {
                  this.router.navigate(['/']);
                  this.flashMessagesService.show("You are cannot edit other people's profile", {cssClass:'alert-danger', timeout:3000});
                } 
                console.log(isSelf);
                return isSelf;
              });
    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route,state);
      }
}

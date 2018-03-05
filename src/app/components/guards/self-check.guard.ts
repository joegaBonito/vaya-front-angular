import { Injectable, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../login/store/auth.action';


@Injectable()
export class SelfCheckGuard implements CanActivate, CanActivateChild {
  isSelf:boolean;
  userId:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService,
    private store:Store<fromApp.AppState>) {
      
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new AuthActions.TrySelfCheck());
    this.store.select('auth').take(1).map((res)=>{
      this.isSelf = res.isSelf;
      if(this.isSelf==false) {
        this.router.navigate(['/']);
        this.flashMessagesService.show("You cannot edit other people's profile", {cssClass:'alert-danger', timeout:3000});
      }
    }).subscribe();
    return this.isSelf;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}

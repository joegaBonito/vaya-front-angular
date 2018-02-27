import { Injectable, Output } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  isAdmin:boolean = false;

  constructor(private router: Router, 
  private store:Store<fromApp.AppState>){
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      /**
       * The code below uses @Ngrx to check admin state.
       */
      this.store.select('auth').map((res)=> {
        this.isAdmin = res.isAdmin
        if(this.isAdmin == false) {
          this.router.navigate(['/']);
        }
      })
      .subscribe(()=>{
        
      })
      return this.isAdmin;
    }

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route,state);
      }
}

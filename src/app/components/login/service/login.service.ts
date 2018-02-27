import { Injectable, Output, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Member } from '../model/Member';
import { Router, CanActivate } from '@angular/router';
import { LoginComponent } from '../login.component';
import * as jwtDecode from 'jwt-decode';

//Allows to share a state between components.
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { config } from '../../../config';

/**
 * THIS SERVICE IS NO LONGER USED.
 * @NGRX is used instead of this.
 */

@Injectable()
export class LoginService {
  private baseUrl = config.backendAPIUrl;
  members: Member[];
  username: string;

  //Allows to share a authentication state between components.
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticatedCurrent = this.isAuthenticated.asObservable();

  //This functions allows to update the authenticated state between components.
  changeAuthenticationStatus(status: boolean) {
    this.isAuthenticated.next(status);
  }

  //Allows to share a admin state between components.
  private isAdmin = new BehaviorSubject<boolean>(false);
  isAdminCurrent = this.isAdmin.asObservable();

  //This functions allows to update the authenticated state between components.
  changeAdminStatus(status: boolean) {
    this.isAdmin.next(status);
  }

  //Allows to share a username state between components.
  private userName = new BehaviorSubject<string>(" ");
  isCurrentUserName = this.userName.asObservable();

  constructor(private http: HttpClient,
    private router: Router) {
  }

  createMember(username: string, name: string, password: string): Observable<Member> {
    return this.http.post<Member>(`${this.baseUrl}/signup`, { username, name, password })
      .catch(this.handleError<Member>('Create Member Error'));
  }
  /*
  * Authenticates Username and Password and generates JWT.
  */
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth`, { username, password })
      .catch(this.handleError<any>('Login Error'));
  }
  /*
  * Checks if the person has the admin role.
  */
  onCheckAdmin(): Observable<boolean> {
    let headers = new HttpHeaders(
      {
        authorization: window.localStorage.getItem('token'),
      }
    )
    return this.http.get<boolean>(`${this.baseUrl}/admin`, { headers })
      .catch(this.handleError<boolean>('Checking Admin Error'))
  }
  /*
  * Checks to allow viewing a page if it belongs to the person who is logged in.
  */
  onSelfCheck(id:string): Observable<boolean> {
    let headers = new HttpHeaders(
      {
        authorization: localStorage.getItem('token')
      }
    )
    return this.http.get<boolean>(`${this.baseUrl}/self/${id}`, { headers })
      .catch(this.handleError<boolean>('Checking Self Error'));
  }

  /*
  * Decodes JWT token and returns username.
  */
  getUsername(): void {
    var token = localStorage.getItem('token');
    var decoded = jwtDecode(token);
    this.isCurrentUserName = Observable.of(decoded.sub);
  }

  /*
  * Finds userId using returned username from a token.
  */
  findUserId(): Observable<any> {
    let username: string;  
    this.getUsername();
    this.isCurrentUserName.subscribe((res)=>{
      username = res;
    });
    return this.http.get<any>(`${this.baseUrl}/members/find?username=${username}`)
      .catch(this.handleError<any>('Login Error'));
  }

  /*
  * Handles authentication based on JWT received at the point of log in.
  * This is being used in AuthGuard.
  */
  getAuthentication(): Observable<any> {
    let headers = new HttpHeaders({
      authorization: localStorage.getItem('token')
    })
    return this.http.get<any>(`${this.baseUrl}/refresh`, { headers })
      .catch(this.handleError<any>('Authentication Error'))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      if (error != null && error.length < 1)
        console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

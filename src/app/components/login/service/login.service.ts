import { Injectable, Output, Input } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Member} from '../model/Member';
import { Router, CanActivate } from '@angular/router';
import { LoginComponent } from '../login.component';
import * as jwtDecode from 'jwt-decode';

//Allows to share a state between components.
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {
  private baseUrl = 'http://192.168.0.2:3175'
  members:Member[];
  username:string;

  //Allows to share a state between components.
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticatedCurrent = this.isAuthenticated.asObservable();

  constructor(private http:HttpClient,
              private router:Router) {
  }

  createMember(username:string, password:string):Observable<Member>{
    return this.http.post<Member>(`${this.baseUrl}/signup`, {username,password})
    .catch(this.handleError<Member>('Create Member Error'));
  }
  /*
  * Authenticates Username and Password and generates JWT.
  */
  login(username:string, password:string):Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/auth`, {username,password})
        .catch(this.handleError<any>('Login Error'));
  }
  /*
  * Decodes JWT token and returns username.
  */
  getUsername():string{
    var token = localStorage.getItem('token');
    var decoded = jwtDecode(token);
    return decoded.sub;
  }
  /*
  * Handles authentication based on JWT received at the point of log in.
  * This is being used in AuthGuard.
  */
  getAuthentication():Observable<any> {
    let headers = new HttpHeaders({
      authorization: localStorage.getItem('token')
    })
    return this.http.get<any>(`${this.baseUrl}/refresh`,{headers})
    .catch(this.handleError<any>('Authentication Error'))
  }

  //This functions allows to update the authenticated state between components.
  changeAuthenticationStatus(status:boolean) {
    this.isAuthenticated.next(status);
  }

  private handleError<T> (operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {

     // TODO: send the error to remote logging infrastructure
     if(error != null && error.length < 1)
     console.error(error); // log to console instead

     // TODO: better job of transforming error for user consumption
     //this.log(`${operation} failed: ${error.message}`);

     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
 }
}

import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Member} from '../model/Member';
import { EventEmitter } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoginService {
  private baseUrl = 'http://localhost:3175'
  members:Member[];
  isAuthenticated:boolean = false;
  @Output() getTokenEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http:HttpClient,
              private router:Router) {

  }

  createMember(username:string, password:string):Observable<Member>{
    return this.http.post<Member>(`${this.baseUrl}/signup`, {username,password})
    .catch(this.handleError<Member>('Create Member Error'));
  }

  login(username:string, password:string):Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/auth`, {username,password})
        .catch(this.handleError<any>('Login Error'));
  }

  setAuthentication(token:any) {
    this.getTokenEmitter.emit(token);
  }

  getAuthentication() {
    if(localStorage.getItem('token')) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }

  private handleError<T> (operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {

     // TODO: send the error to remote logging infrastructure
     console.error(error); // log to console instead

     // TODO: better job of transforming error for user consumption
     //this.log(`${operation} failed: ${error.message}`);

     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
 }
}

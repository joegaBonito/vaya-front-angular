import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Email } from "../model/Email";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class ContactUsService {
    baseUrl = `http://localhost:3175`;

    constructor(private http:HttpClient){}

    sendEmail(email:Email):Observable<Email>{
        return this.http.post<Email>(`${this.baseUrl}/contact-us`, email)
        .catch(this.handleError<Email>('Send Email Error'));
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
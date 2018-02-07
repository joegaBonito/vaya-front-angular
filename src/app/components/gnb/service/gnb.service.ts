import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { of } from "rxjs/observable/of";
import { config } from "../../../config";

@Injectable()
export class GnbService {

    private baseUrl = config.backendAPIUrl;

    constructor(private http:HttpClient) {

    }

    onCheckAdmin(): Observable<boolean> {
        let headers = new HttpHeaders(
          {
            authorization: localStorage.getItem('token'),
          }
        )
        return this.http.get<boolean>(`${this.baseUrl}/admin`, { headers })
          .catch(this.handleError<boolean>('Checking Admin Error'))
      }

      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
     
          // TODO: send the error to remote logging infrastructure
          //console.error(error); // log to console instead
     
          // TODO: better job of transforming error for user consumption
          //this.log(`${operation} failed: ${error.message}`);
     
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
}
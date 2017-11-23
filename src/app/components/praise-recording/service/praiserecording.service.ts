import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {PraiseRecording} from '../model/PraiseRecording';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PraiserecordingService {
    private baseUrl = 'http://localhost:3175'
    praiseRecodrings:PraiseRecording[];
  constructor(private http:HttpClient) { }

  getPraiseRecordings():Observable<PraiseRecording[]> {
    return this.http.get<PraiseRecording[]>(`${this.baseUrl}/praiserecording-list`)
    .catch(this.handleError('getPraiseRecordings', []));
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

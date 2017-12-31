import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {YAColumn} from '../model/YAColumn';

@Injectable()
export class YacolumnService {

  private baseUrl = 'http://localhost:3175'
  yaColumns:YAColumn[];
  constructor(private http:HttpClient) {
  }

  getYAColumns():Observable<YAColumn[]> {
    return this.http.get<YAColumn[]>(`${this.baseUrl}/yacolumn-list`)
        .catch(this.handleError('getYAColumns', []));
  }

  getYAColumn(id: string): Observable<YAColumn> {
    return this.http.get<YAColumn>(`${this.baseUrl}/yacolumn-readpost/${id}`)
        .catch(this.handleError<YAColumn>(`getYAColumn id=${id}`));
  }

  deleteYAColumn(id:string):Observable<YAColumn> {
    return this.http.delete<YAColumn>(`${this.baseUrl}/yacolumn-delete/${id}`)
    .catch(this.handleError<YAColumn>('Delete YAColumn Error'));
  }

  editYAColumn(id:string, yaColumn:YAColumn):Observable<YAColumn> {
    return this.http.put<YAColumn>(`${this.baseUrl}/yacolumn-edit/${id}`, yaColumn)
    .catch(this.handleError<YAColumn>('Update YAColumn Error'));
  }

  newYAColumn(yaColumn:YAColumn):Observable<YAColumn>{
    return this.http.post<YAColumn>(`${this.baseUrl}/yacolumn-create`,yaColumn).catch(this.handleError<YAColumn>('Create YaColumn Error'));
  }

  onCheckAdmin():Observable<boolean> {
    let headers = new HttpHeaders(
      {
        authorization:localStorage.getItem('token'),
      }
    )
      return this.http.get<boolean>(`${this.baseUrl}/admin`,{headers})
      .catch(this.handleError<boolean>('Checking Admin Error'))
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

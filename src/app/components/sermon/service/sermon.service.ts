import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {SermonPost} from '../model/SermonPost';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SermonService {
  private baseUrl = 'http://localhost:3175'
  sermonPosts:SermonPost[];
  constructor(private http:HttpClient) {
  }

  getSermonPosts():Observable<SermonPost[]> {
    return this.http.get<SermonPost[]>(`${this.baseUrl}/sermon-list`)
    .catch(this.handleError('getSermonPosts', []));
  }

  getSermonPost(id: string): Observable<SermonPost> {
    return this.http.get<SermonPost>(`${this.baseUrl}/sermon-readpost/${id}`)
        .catch(this.handleError<SermonPost>(`getSermonPost id=${id}`));
  }

  newSermonPost(sermonPost:SermonPost):Observable<SermonPost> {
   return this.http.post<SermonPost>(`${this.baseUrl}/sermon-create`, sermonPost).map(res => JSON.stringify(res))
       .catch(this.handleError<SermonPost>('Create SermonPost Error'));
  }

  deleteSermonPost(id:string):Observable<SermonPost> {
    return this.http.delete<SermonPost>(`${this.baseUrl}/sermon-delete/${id}`,httpOptions)
    .catch(this.handleError<SermonPost>('Delete SermonPost Error'));
  }

  editSermonPost(id:string, sermonPost:SermonPost):Observable<SermonPost> {
    return this.http.put<SermonPost>(`${this.baseUrl}/sermon-edit/${id}`, sermonPost, httpOptions)
    .catch(this.handleError<SermonPost>('Update SermonPost Error'));
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

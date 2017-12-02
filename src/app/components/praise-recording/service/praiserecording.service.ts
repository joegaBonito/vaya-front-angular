import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {PraiseRecording} from '../model/PraiseRecording';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable()
export class PraiserecordingService {
    private baseUrl = 'http://localhost:3175'
    praiseRecodrings:PraiseRecording[];

  constructor(private http:HttpClient) {

  }

  getPraiseRecordings():Observable<PraiseRecording[]> {
    return this.http.get<PraiseRecording[]>(`${this.baseUrl}/praiserecording-list`)
    .catch(this.handleError<PraiseRecording[]>('getPraiseRecordings', []));
  }

  getPraiseRecording(id:string):Observable<PraiseRecording> {
    return this.http.get<PraiseRecording>(`${this.baseUrl}/praiserecording-read/${id}`)
    .catch(this.handleError<PraiseRecording>(`getPraiseRecording id=${id}`));
  }

  newSermonPost(praiseRecording:PraiseRecording,fileData:File):Observable<PraiseRecording>{
    let formData:FormData = new FormData();
    formData.append('file', fileData);
    formData.append('title',praiseRecording.title);
    formData.append('author',praiseRecording.author);
    formData.append('date',praiseRecording.date);
    formData.append('body',praiseRecording.body);

    return this.http.post<PraiseRecording>(`${this.baseUrl}/praiserecording-create`,formData)
    .catch(this.handleError<PraiseRecording>('Create PraiseRecording Error'));
  }

  deletePraiseRecording(id:string):Observable<PraiseRecording> {
    return this.http.delete<PraiseRecording>(`${this.baseUrl}/praiserecording-delete/${id}`)
    .catch(this.handleError<PraiseRecording>('Delete PraiseRecording Error'));
  }

  editPraiseRecording(id:string,praiseRecording:PraiseRecording,fileData:File):Observable<PraiseRecording> {
    let formData:FormData = new FormData();
    formData.append('file', fileData);
    formData.append('title',praiseRecording.title);
    formData.append('author',praiseRecording.author);
    formData.append('date',praiseRecording.date);
    formData.append('body',praiseRecording.body);

    return this.http.put<PraiseRecording>(`${this.baseUrl}/praiserecording-edit/${id}`, formData)
    .catch(this.handleError<PraiseRecording>('Update PraiseRecording Error'));
  }

  downloadFile(id:string): Observable<Blob> {
      return this.http.get(`${this.baseUrl}/praiserecording-file/${id}`,{responseType:'blob'})
          .catch(this.handleError('File Downloading Error'));
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {PraiseRecording} from '../model/PraiseRecording';
import { config } from '../../../config';


@Injectable()
export class PraiserecordingService {
  baseUrl = config.backendAPIUrl;
  
  praiseRecodrings: PraiseRecording[];

  constructor(private http: HttpClient) {

  }

  getPraiseRecordings(): Observable<PraiseRecording[]> {
    return this.http.get<PraiseRecording[]>(`${this.baseUrl}/praiserecording-list`)
      .catch(this.handleError<PraiseRecording[]>('getPraiseRecordings', []));
  }

  getPraiseRecording(id: string): Observable<PraiseRecording> {
    return this.http.get<PraiseRecording>(`${this.baseUrl}/praiserecording-read/${id}`)
      .catch(this.handleError<PraiseRecording>(`getPraiseRecording id=${id}`));
  }

  newPraiseRecording(praiseRecording: PraiseRecording, fileData: File, fileName:string): Observable<PraiseRecording> {
    let formData: FormData = new FormData();
    formData.append('file', fileData);
    formData.append('title', praiseRecording.title);
    formData.append('author', praiseRecording.author);
    formData.append('date', praiseRecording.date);
    formData.append('body', praiseRecording.body);
    formData.append('fileName', fileName);
    let apiURL = `${this.baseUrl}/praiserecording-create`;
    return this.http.post<PraiseRecording>(apiURL, formData)
      .catch(this.handleError<PraiseRecording>('Create PraiseRecording Error'));
  }

  deletePraiseRecording(id: string): Observable<PraiseRecording> {
    let apiURL = `${this.baseUrl}/praiserecording-delete/${id}`;
    return this.http.delete<PraiseRecording>(apiURL).catch(this.handleError<PraiseRecording>('Delete PraiseRecording Error'));
  }

  editPraiseRecording(id: string, praiseRecording: PraiseRecording, fileData: File, fileName:string): Observable<PraiseRecording> {
    let formData: FormData = new FormData();
    formData.append('file', fileData);
    formData.append('title', praiseRecording.title);
    formData.append('author', praiseRecording.author);
    formData.append('date', praiseRecording.date);
    formData.append('body', praiseRecording.body);
    formData.append('fileName', fileName);
    let apiURL = `${this.baseUrl}/praiserecording-edit/${id}`;
    return this.http.put<PraiseRecording>(apiURL, formData).catch(this.handleError<PraiseRecording>('Update PraiseRecording Error'));
  }

  downloadFile(filename: string): Observable<Blob> {
    let apiURL = `${this.baseUrl}/praiserecording-file?filename=${filename}`;
    //{responseType:'blob' as 'blob'} has been added to the requester header because the 'type' undefined error when download.
    return this.http.get(apiURL, { responseType: 'blob' as 'blob' }).catch(this.handleError<Blob>('File Downloading Error'));
  }

  private handleError<T>(operation = 'operation', result?: T) {
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

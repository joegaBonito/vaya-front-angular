import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {SermonPost} from '../model/SermonPost';
import { config } from '../../../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SermonService {
  private baseUrl = config.backendAPIUrl;
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

  newSermonPost(sermonPost:SermonPost,fileData:File, fileName:string):Observable<SermonPost> {
    let formData: FormData = new FormData();
    formData.append('file', fileData);
    formData.append('title', sermonPost.title);
    formData.append('author', sermonPost.author);
    formData.append('mainVerse',sermonPost.mainVerse);
    formData.append('date', sermonPost.date);
    formData.append('body', sermonPost.body);
    formData.append('fileName',fileName);

    let apiURL = `${this.baseUrl}/sermon-create`;
    return this.http.post<SermonPost>(apiURL, formData)
    .catch(this.handleError<SermonPost>('Create SermonPost Error'));
  }

  deleteSermonPost(id:string):Observable<SermonPost> {
    return this.http.delete<SermonPost>(`${this.baseUrl}/sermon-delete/${id}`,httpOptions)
    .catch(this.handleError<SermonPost>('Delete SermonPost Error'));
  }

  editSermonPost(id:string, sermonPost:SermonPost,fileData:File, fileName:string):Observable<SermonPost> {
    let formData: FormData = new FormData();
    formData.append('file', fileData);
    formData.append('title', sermonPost.title);
    formData.append('author', sermonPost.author);
    formData.append('mainVerse',sermonPost.mainVerse);
    formData.append('date', sermonPost.date);
    formData.append('body', sermonPost.body);
    formData.append('fileName',fileName);

    let apiURL = `${this.baseUrl}/sermon-edit/${id}`
    return this.http.put<SermonPost>(apiURL, formData)
    .catch(this.handleError<SermonPost>('Update SermonPost Error'));
  }

  downloadFile(filename: string): Observable<Blob> {
    let apiURL = `${this.baseUrl}/sermon-file?filename=${filename}`;
    //{responseType:'blob' as 'blob'} has been added to the requester header because the 'type' undefined error when download.
    return this.http.get(apiURL, { responseType: 'blob' as 'blob' }).catch(this.handleError<Blob>('File Downloading Error'));
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

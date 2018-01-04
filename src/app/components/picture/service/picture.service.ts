import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Picture } from '../model/Picture';

@Injectable()
export class PictureService {
  private baseUrl = 'http://192.168.0.2:3175';
  picture:Picture;

  constructor(private http:HttpClient) { }

  getPictures():Observable<Picture[]> {
    return this.http.get<Picture[]>(`${this.baseUrl}/picture-list`)
    .catch(this.handleError<Picture[]>('getPictures', []));
  }

  newPicturePost(picture:Picture,fileData:File):Observable<Picture>{
    let formData:FormData = new FormData();
    formData.append('file', fileData);
    formData.append('title',picture.title);
    formData.append('author',picture.author);
    formData.append('date',picture.date);
    formData.append('body',picture.body);

    let apiURL = `${this.baseUrl}/picture-create`;
    return this.http.post<Picture>(apiURL,formData)
    .catch(this.handleError<Picture>('Create Picture Error'));
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Picture } from '../model/Picture';
import { PictureList } from '../model/PictureList';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PictureService {
  baseUrl = 'http://localhost:3175';
  picture:Picture;

  constructor(private http:HttpClient) { }

  getPictureLists():Observable<PictureList[]> {
    return this.http.get<PictureList[]>(`${this.baseUrl}/pictureList-list`)
    .catch(this.handleError<PictureList[]>('getPictures', []));
  }

  getPictures(id:string):Observable<Picture[]> {
    return this.http.get<Picture[]>(`${this.baseUrl}/picture-list/${id}`)
    .catch(this.handleError<Picture[]>('getPictures', []));
  }

  newPictureListPost(pictureList:PictureList,fileData:File, originalFileName:string):Observable<PictureList>{
    let formData:FormData = new FormData();
    formData.append('file', fileData);
    formData.append('title',pictureList.title);
    formData.append('year',pictureList.year);
    formData.append('originalFileName',originalFileName);

    let apiURL = `${this.baseUrl}/pictureList-create`;
    return this.http.post<PictureList>(apiURL,formData)
    .catch(this.handleError<PictureList>('Create PictureList Error'));
  }
  
  newPicturePost(picture:Picture,fileData:File, originalFileName:string,categoryId:string):Observable<Picture>{
    let formData:FormData = new FormData();
    formData.append('file', fileData);
    formData.append('title',picture.title);
    formData.append('author',picture.author);
    formData.append('date',picture.date);
    formData.append('body',picture.body);
    formData.append('originalFileName',originalFileName);
    formData.append('categoryId',categoryId);

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

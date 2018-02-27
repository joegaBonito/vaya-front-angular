import { Injectable } from "@angular/core";
import {News} from '../model/news';
import { Observable } from "rxjs/Observable";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { of } from "rxjs/observable/of";
import { config } from "../../../config";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NewsService {

    private baseUrl = config.backendAPIUrl;

    constructor(private http:HttpClient){}

    getNews():Observable<News> {
        let id = 1;
        return this.http.get<News>(`${this.baseUrl}/news-read/${id}`)
        .catch(this.handleError<News>('getNews'));
    }
    editNews(news:News):Observable<News> {
        let id = 1;
        return this.http.put<News>(`${this.baseUrl}/news-edit/${id}`, news, httpOptions)
        .catch(this.handleError<News>('Update News Error'));
    }

    onCheckAdmin(): Observable<boolean> {
        let headers = new HttpHeaders(
          {
            authorization: window.localStorage.getItem('token'),
          }
        )
        return this.http.get<boolean>(`${this.baseUrl}/admin`, { headers })
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
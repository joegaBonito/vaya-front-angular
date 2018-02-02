import { Injectable } from "@angular/core";
import { Member } from "../../login/model/Member";
import { Observable } from "rxjs/Observable";
import { HttpClient} from "@angular/common/http";
import { of } from "rxjs/observable/of";


@Injectable()
export class MemberService {

    baseUrl = `http://localhost:3175`;

    constructor(private http:HttpClient){}

    getMember(id:string):Observable<Member> {
        return this.http.get<Member>(`${this.baseUrl}/members/read/${id}`)
        .catch(this.handleError<Member>('get Member Error'));
    }

    getMemberList():Observable<Member[]> {
        return this.http.get<Member[]>(`${this.baseUrl}/members/list`)
        .catch(this.handleError<Member[]>('getMemberList Error'));
    }

    editMember(id:string,value:Member):Observable<Member> {
        let apiURL = `${this.baseUrl}/members/edit/${id}`;
        console.log(value.role);
        return this.http.put<Member>(apiURL, value).catch(this.handleError<Member>('Update Member Error'));
    }

    deleteMember(id: string): Observable<Member> {
        let apiURL = `${this.baseUrl}/members/delete/${id}`;
        return this.http.delete<Member>(apiURL).catch(this.handleError<Member>('Delete Member Error'));
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
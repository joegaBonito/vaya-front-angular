import { Injectable } from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LandingPageService {
    newsFieldShow = new BehaviorSubject<boolean>(true);
    currentNewFieldShow = this.newsFieldShow.asObservable();

    constructor(){}

    changeNewsFieldShow(newsFieldShow:boolean) {
        this.newsFieldShow.next(newsFieldShow);
    }

}
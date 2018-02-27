import { Component, OnInit } from '@angular/core';
import { News } from './model/news';
import { NewsService } from './service/news.service';
import 'rxjs/add/operator/take';
import { LandingPageService } from '../landing-page/service/landing-page.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../components/login/store/auth.reducer';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:News;
  authState:Observable<fromAuth.State>;
  newsFieldStatus:boolean;

  constructor(private newsService:NewsService,
             private landingPageService:LandingPageService,
              private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.newsService.getNews()
    .take(1)
    .subscribe((res)=> {
      return this.news = res
    });
    this.authState = this.store.select('auth');
    this.landingPageService.currentNewFieldShow.subscribe((res) => {
      this.newsFieldStatus = res;
    })
    
  }
  onClickEdit():void {
    this.landingPageService.changeNewsFieldShow(false);
  }
}

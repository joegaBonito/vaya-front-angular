import { Component, OnInit } from '@angular/core';
import { News } from './model/news';
import { NewsService } from './service/news.service';
import 'rxjs/add/operator/take';
import { LandingPageService } from '../landing-page/service/landing-page.service';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/service/login.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:News;
  isAdmin:Observable<boolean>;
  newsFieldStatus:boolean;

  constructor(private newsService:NewsService,
             private landingPageService:LandingPageService,
              private loginService:LoginService) { }

  ngOnInit() {
    this.newsService.getNews()
    .take(1)
    .subscribe((res)=> {
      return this.news = res
    });
    this.loginService.onCheckAdmin().subscribe((res) => {
      this.loginService.changeAdminStatus(res);
      this.isAdmin = this.loginService.isAdminCurrent;
    });
    this.isAdmin = this.loginService.isAdminCurrent;
    this.landingPageService.currentNewFieldShow.subscribe((res) => {
      this.newsFieldStatus = res;
    })
  }
  onClickEdit():void {
    this.landingPageService.changeNewsFieldShow(false);
  }
}

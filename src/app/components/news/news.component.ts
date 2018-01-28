import { Component, OnInit } from '@angular/core';
import { News } from './model/news';
import { NewsService } from './service/news.service';
import 'rxjs/add/operator/take';
import { LandingPageService } from '../landing-page/service/landing-page.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news:News;
  isAdmin:boolean = false;
  newsFieldStatus:boolean;

  constructor(private newsService:NewsService,
             private landingPageService:LandingPageService) { }

  ngOnInit() {
    this.newsService.getNews()
    .take(1)
    .subscribe((res)=> {
      return this.news = res
    });
    this.onCheckAdmin();
  }

  onCheckAdmin(){
    this.newsService.onCheckAdmin().subscribe((res)=> {
      if(res == true) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
    this.landingPageService.currentNewFieldShow.subscribe((res) => {
      this.newsFieldStatus = res;
    })
  }

  onClickEdit():void {
    this.landingPageService.changeNewsFieldShow(false);
  }
}

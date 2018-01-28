import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { News } from '../model/news';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NewsService } from '../service/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'news-edit-component',
    styleUrls: ['./news-edit.component.css'],
    templateUrl: './news-edit.component.html'
})
export class NewsEditComponent implements OnInit {
    news:News;

    constructor(private flashMessagesService:FlashMessagesService,
                private newsService:NewsService,
                private route:ActivatedRoute) {

    }

    ngOnInit() {
        this.newsService.getNews()
    .take(1)
        .subscribe((res)=> {
          return this.news = res
     });
    }

    onSubmit({value,valid}:{value:News, valid:boolean}) {
        if(!valid) {
          this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
          window.location.reload();
        } else {
          this.newsService.editNews(value).subscribe(()=>{
            window.location.reload();
            this.flashMessagesService.show('News has been edited',{cssClass:'alert-success',timeout:3000});
          });
        }
      }

    onClickCancel() {
        window.location.reload();
    }
}
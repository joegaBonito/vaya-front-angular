import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import {SermonPost} from '../model/SermonPost';
import { SermonService } from '../service/sermon.service';

@Component({
  selector: 'app-sermon-list',
  templateUrl: './sermon-list.component.html',
  styleUrls: ['./sermon-list.component.css']
})
export class SermonListComponent implements OnInit {

  items:SermonPost[];
  selectedPost:SermonPost;
  isLoading: boolean = false;

  constructor(private sermonService:SermonService) { }

  getSermonPosts():void {
    this.isLoading = true;
    this.sermonService.getSermonPosts()
    .subscribe(sermonPosts=>{
      this.items = sermonPosts;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getSermonPosts();
  }
}

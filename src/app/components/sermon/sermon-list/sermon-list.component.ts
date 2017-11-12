import { Component, OnInit } from '@angular/core';
import {SermonPost} from '../model/SermonPost';
import {SermonPosts} from '../model/Mock-SermonPosts';
import { SermonService } from '../service/sermon.service';

@Component({
  selector: 'app-sermon-list',
  templateUrl: './sermon-list.component.html',
  styleUrls: ['./sermon-list.component.css']
})
export class SermonListComponent implements OnInit {

  items:SermonPost[];
  selectedPost:SermonPost;

  constructor(private sermonService:SermonService) { }

  getSermonPosts():void {
    this.sermonService.getSermonPosts().then(sermonPosts=> this.items = sermonPosts);
  }

  ngOnInit() {
    this.getSermonPosts();
  }
}

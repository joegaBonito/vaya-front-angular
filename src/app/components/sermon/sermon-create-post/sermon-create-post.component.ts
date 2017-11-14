import { Component, OnInit } from '@angular/core';
import {SermonPost} from '../model/SermonPost';

@Component({
  selector: 'app-sermon-create-post',
  templateUrl: './sermon-create-post.component.html',
  styleUrls: ['./sermon-create-post.component.css']
})
export class SermonCreatePostComponent implements OnInit {

  sermonPost:SermonPost;

  submitted:boolean = false;
  constructor() {
  }

  ngOnInit() {
  }


  onSubmit(sermonCreateForm) {
    this.submitted = true;
  }

}

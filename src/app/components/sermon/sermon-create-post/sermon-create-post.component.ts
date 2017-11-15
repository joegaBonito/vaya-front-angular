import { Component, OnInit } from '@angular/core';
import {SermonPost} from '../model/SermonPost';
import { SermonService } from '../service/sermon.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sermon-create-post',
  templateUrl: './sermon-create-post.component.html',
  styleUrls: ['./sermon-create-post.component.css']
})
export class SermonCreatePostComponent implements OnInit {

  sermonPost:SermonPost;
  submitted:boolean = false;

  constructor(
    private sermonService:SermonService,
    private flashMessagesService:FlashMessagesService,
    private router:Router) {
  }

  ngOnInit() {

  }


  onSubmit({value,valid}:{value:SermonPost, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('please fill in all fields', {cssClass:'alert-danger', timeout:4000});
      this.router.navigate(['SermonCreatePostComponent']);
    } else {
      this.sermonService.newSermonPost(value);
      this.flashMessagesService.show('New Client added',{cssClass:'alert-success',timeout:4000});
      this.router.navigate(['/']);
    }
  }

}

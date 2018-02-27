import { Component, OnInit } from '@angular/core';
import {SermonPost} from '../model/SermonPost';
import { SermonService } from '../service/sermon.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-sermon-create-post',
  templateUrl: './sermon-create-post.component.html',
  styleUrls: ['./sermon-create-post.component.css']
})
export class SermonCreatePostComponent implements OnInit {

  sermonPost:SermonPost = new SermonPost();
  submitted:boolean = false;
  loggedInEmail:string;

  constructor(
    private sermonService:SermonService,
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private store:Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.select('auth').subscribe((res)=>{
      this.sermonPost.author = res.currentUsername;
    })
    this.sermonPost.date= JSON.stringify(Date.now());
  }

  onClickBack(){
    this.router.navigate(['/sermon/list']);
  }


  onSubmit({value,valid}:{value:SermonPost, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['/sermon/create']);
    } else {
      this.sermonService.newSermonPost(value)
      .subscribe(res=>{
        this.flashMessagesService.show('New Client has been added',{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/sermon/list']);
      });
    }
  }

}

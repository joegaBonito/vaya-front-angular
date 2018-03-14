import { Component, OnInit } from '@angular/core';
import {SermonPost} from '../model/SermonPost';
import { SermonService } from '../service/sermon.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-sermon-create-post',
  templateUrl: './sermon-create-post.component.html',
  styleUrls: ['./sermon-create-post.component.css']
})
export class SermonCreatePostComponent implements OnInit {

  sermonPost:SermonPost = new SermonPost();
  submitted:boolean = false;
  loggedInEmail:string;
  fileData:File;
  fileName:string;
  hide:boolean = false;

  constructor(
    private sermonService:SermonService,
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private store:Store<fromApp.AppState>,
    private ngProgress: NgProgress) {
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

  fileChange(event) {
    this.fileData = event.target.files[0];
    this.fileName = this.fileData.name;
    //console.log(fileName);
}

  onSubmit({value,valid}:{value:SermonPost, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['/sermon/create']);
    } else {
    this.hide = true;
    this.ngProgress.start();
      this.sermonService.newSermonPost(value,this.fileData, this.fileName).subscribe(()=>{
        this.flashMessagesService.show('New Client has been added',{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/sermon/list']);
        this.ngProgress.done();
        this.hide = false;
      });
    }
  }

}

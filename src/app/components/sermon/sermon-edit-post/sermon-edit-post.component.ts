import { Component, OnInit } from '@angular/core';
import {SermonPost} from '../model/SermonPost';
import { SermonService } from '../service/sermon.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-sermon-edit-post',
  templateUrl: './sermon-edit-post.component.html',
  styleUrls: ['./sermon-edit-post.component.css']
})
export class SermonEditPostComponent implements OnInit {

  sermonPost:SermonPost;
  submitted:boolean = false;
  fileData:File;
  fileDataChanged:boolean = false;
  fileName:string;

  constructor(
    private sermonService:SermonService,
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute,
    private store:Store<fromApp.AppState>) {
    }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params:ParamMap)=>this.sermonService.getSermonPost(params.get('id')))
    .subscribe(sermonPost =>{
      this.sermonPost = sermonPost;
       this.store.select('auth').subscribe((res)=>{
         this.sermonPost.author = res.currentUsername;
       })
    });
  }

  fileChange(event) {
    this.fileData = event.target.files[0];
    this.fileDataChanged = true;
    this.fileName = this.fileData.name;
}

  onClickBack(){
    this.router.navigate(['/sermon/list']);
  }

  onSubmit({value,valid}:{value:SermonPost, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['SermonEditPostComponent',this.sermonPost.id]);
    } else {
      this.sermonService.editSermonPost(this.route.snapshot.params.id,value,this.fileData, this.fileName)
      .subscribe(()=>{
        this.router.navigate(['/sermon/list']);
        this.flashMessagesService.show('Sermon Post has been edited',{cssClass:'alert-success',timeout:3000});
      });
    }
  }
}

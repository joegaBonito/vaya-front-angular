import { Component, OnInit } from '@angular/core';
import { PraiseRecording } from '../model/PraiseRecording';
import { Router } from '@angular/router';
import {PraiserecordingService} from '../service/praiserecording.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-praise-recording-create-post',
  templateUrl: './praise-recording-create-post.component.html',
  styleUrls: ['./praise-recording-create-post.component.css']
})
export class PraiseRecordingCreatePostComponent implements OnInit {

  praiseRecording:PraiseRecording = new PraiseRecording();
  fileData:File;

  constructor(private router:Router,
              private flashMessagesService:FlashMessagesService,
              private praiserecordingService:PraiserecordingService,
              private store:Store<fromApp.AppState>
              ) {

  }

  ngOnInit() {
    this.store.select('auth').subscribe((res)=>{
      this.praiseRecording.author = res.currentUsername;
    });
    this.praiseRecording.date= JSON.stringify(Date.now());
  }

  fileChange(event) {
      this.fileData = event.target.files[0];
      let fileName = this.fileData.name;
      //console.log(fileName);
  }

  onClickBack(){
    this.router.navigate(['/praise-recording/list']);
  }

  onSubmit({value,valid}:{value:PraiseRecording, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['/praise-recording/create']);
    } else {
      this.praiserecordingService.newSermonPost(value,this.fileData).subscribe(()=>{
        this.router.navigate(['/praise-recording/list']);
        this.flashMessagesService.show('New Post has been added',{cssClass:'alert-success',timeout:3000});
      });
    }
  }

}

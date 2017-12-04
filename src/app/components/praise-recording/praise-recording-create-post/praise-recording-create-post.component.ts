import { Component, OnInit } from '@angular/core';
import { PraiseRecording } from '../model/PraiseRecording';
import { Router } from '@angular/router';
import {PraiserecordingService} from '../service/praiserecording.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-praise-recording-create-post',
  templateUrl: './praise-recording-create-post.component.html',
  styleUrls: ['./praise-recording-create-post.component.css']
})
export class PraiseRecordingCreatePostComponent implements OnInit {

  fileData:File;

  constructor(private router:Router,
              private praiserecordingService:PraiserecordingService,
              private flashMessagesService:FlashMessagesService) {

  }

  ngOnInit() {
  }

  fileChange(event) {
      this.fileData = event.target.files[0];
      let fileName = this.fileData.name;
      console.log(fileName);
  }

  onSubmit({value,valid}:{value:PraiseRecording, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['PraiseRecordingCreatePostComponent']);
    } else {
      this.praiserecordingService.newSermonPost(value,this.fileData).subscribe(()=>{
        this.router.navigate(['/PraiseRecordingListComponent']);
        this.flashMessagesService.show('New Post has been added',{cssClass:'alert-success',timeout:3000});
      });
    }
  }

}

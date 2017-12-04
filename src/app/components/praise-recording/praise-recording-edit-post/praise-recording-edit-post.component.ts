import { Component, OnInit } from '@angular/core';
import { PraiseRecording} from '../model/PraiseRecording';
import { PraiserecordingService } from '../service/praiserecording.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
  selector: 'app-praise-recording-edit-post',
  templateUrl: './praise-recording-edit-post.component.html',
  styleUrls: ['./praise-recording-edit-post.component.css']
})
export class PraiseRecordingEditPostComponent implements OnInit {


    praiseRecording:PraiseRecording;
    submitted:boolean = false;
    fileData:File;
    fileDataChanged:boolean = false;

    constructor(
      private praiserecordingService:PraiserecordingService,
      private flashMessagesService:FlashMessagesService,
      private router:Router,
      private route:ActivatedRoute,
      private location:Location) {

      }

    ngOnInit() {
      this.praiserecordingService.getPraiseRecording(this.route.snapshot.params.id)
      .subscribe(praiseRecording => this.praiseRecording = praiseRecording);
    }

    fileChange(event) {
        this.fileData = event.target.files[0];
        this.fileDataChanged = true;
    }

    goBack():void {
      this.location.back();
    }

    onSubmit({value,valid}:{value:PraiseRecording, valid:boolean}) {
      if(!valid) {
        this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
        this.router.navigate(['PraiseRecordingEditPostComponent',this.praiseRecording.id]);
      } else if(this.fileDataChanged == false) {
        this.flashMessagesService.show('The file was not changed.', {cssClass:'alert-danger', timeout:3000});
        this.router.navigate(['PraiseRecordingEditPostComponent',this.praiseRecording.id]);
      } else {
        this.praiserecordingService.editPraiseRecording(this.route.snapshot.params.id,value,this.fileData)
        .subscribe(res=>{
          this.router.navigate(['/PraiseRecordingListComponent']);
          this.flashMessagesService.show('Client has been edited',{cssClass:'alert-success',timeout:3000});
      });
      }
    }

}

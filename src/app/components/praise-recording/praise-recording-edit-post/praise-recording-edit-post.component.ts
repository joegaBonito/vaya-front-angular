import { Component, OnInit } from '@angular/core';
import { PraiseRecording} from '../model/PraiseRecording';
import { PraiserecordingService } from '../service/praiserecording.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';
import { LoginService } from '../../login/service/login.service';

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
      private location:Location,
      private loginService:LoginService) {

      }

    ngOnInit() {
      this.route.paramMap
            // (+) converts string 'id' to a number (+params.get('id'))
           .switchMap((params: ParamMap) => this.praiserecordingService.getPraiseRecording(params.get('id')))
           .subscribe(praiseRecording => {
             this.praiseRecording = praiseRecording;
             this.praiseRecording.author = this.loginService.getUsername();
           });
    }

    fileChange(event) {
        this.fileData = event.target.files[0];
        this.fileDataChanged = true;
    }

    onClickBack(){
      this.router.navigate(['/praise-recording/list']);
    }

    onSubmit({value,valid}:{value:PraiseRecording, valid:boolean}) {
      if(!valid) {
        this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
        this.router.navigate(['/praise-recording/edit',this.praiseRecording.id]);
      } else {
        this.praiserecordingService.editPraiseRecording(this.route.snapshot.params.id,value,this.fileData)
        .subscribe(res=>{
          this.router.navigate(['//praise-recording/list']);
          this.flashMessagesService.show('Client has been edited',{cssClass:'alert-success',timeout:3000});
      });
      }
    }

}

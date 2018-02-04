import { Component, OnInit } from '@angular/core';
import { PraiseRecording } from '../model/PraiseRecording';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Location }                 from '@angular/common';
import { PraiserecordingService } from '../service/praiserecording.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as FileSaver from 'file-saver';
import { LoginService } from '../../login/service/login.service';

@Component({
  selector: 'app-praise-recording-view-post',
  templateUrl: './praise-recording-view-post.component.html',
  styleUrls: ['./praise-recording-view-post.component.css']
})
export class PraiseRecordingViewPostComponent implements OnInit {
  praiseRecording:PraiseRecording;
  imageFile:ByteString;
  fileName:string;
  isAdmin:boolean = false;
  isOwner:boolean = false;

  private baseUrl = 'http://localhost:3175';
  constructor(
    private route:ActivatedRoute,
    private praiserecordingService:PraiserecordingService,
    private router:Router,
    private location:Location,
    private http:Http,
    private loginService:LoginService
  ) {

  }

  ngOnInit() {
    this.route.paramMap
          // (+) converts string 'id' to a number (+params.get('id'))
         .switchMap((params: ParamMap) => this.praiserecordingService.getPraiseRecording(params.get('id')))
         .subscribe(praiseRecording => {
           this.praiseRecording = praiseRecording;
           this.getImage();
         });
    this.onCheckAdmin();
  }

  getImage() {
      this.imageFile = `${this.baseUrl}/praiserecording-file/${this.route.snapshot.params.id}`;
      this.fileName =  this.praiseRecording.title + ".mp3";
  }

  downloadFile() {
    this.praiserecordingService.downloadFile(this.route.snapshot.params.id).subscribe(data => {
            FileSaver.saveAs(data,this.fileName);
        }
    )
  }

  goBack():void {
    this.location.back()
  }

  onClickDelete() {
     this.praiserecordingService.deletePraiseRecording(this.route.snapshot.params.id)
    .subscribe(()=> this.router.navigate(['/praise-recording/list']));
  }

  onCheckAdmin(){
    this.loginService.onCheckAdmin().subscribe((res)=> {
      if(res == true) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
        this.onCheckOwner();
      }
    });
  }

  onCheckOwner(){
      if(this.loginService.getUsername() == this.praiseRecording.author) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }
  }
}

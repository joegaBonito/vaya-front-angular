import { Component, OnInit } from '@angular/core';
import { PraiseRecording } from '../model/PraiseRecording';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Location }                 from '@angular/common';
import { PraiserecordingService } from '../service/praiserecording.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-praise-recording-view-post',
  templateUrl: './praise-recording-view-post.component.html',
  styleUrls: ['./praise-recording-view-post.component.css']
})
export class PraiseRecordingViewPostComponent implements OnInit {
  praiseRecording:PraiseRecording;
  imageFile:ByteString;
  private baseUrl = 'http://localhost:3175';
  constructor(
    private route:ActivatedRoute,
    private praiserecordingService:PraiserecordingService,
    private router:Router,
    private location:Location,
    private http:Http
  ) {

  }

  ngOnInit() {
    this.route.paramMap
          // (+) converts string 'id' to a number (+params.get('id'))
         .switchMap((params: ParamMap) => this.praiserecordingService.getPraiseRecording(params.get('id')))
         .subscribe(praiseRecording => {
           this.praiseRecording = praiseRecording;
         });
    this.getImage();
  }

  getImage() {
        this.imageFile = `${this.baseUrl}/praiserecording-file/${this.route.snapshot.params.id}`;
  }

  downloadFile() {
    this.praiserecordingService.downloadFile(this.route.snapshot.params.id)
    .subscribe(response => {this.saveToFileSystem(response); });
  }

  private saveToFileSystem(response) {
    console.log(response);
    // const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    // const parts: string[] = contentDispositionHeader.split(';');
    // const filename = parts[1].split('=')[1];
    const filename = this.praiseRecording.title;
    const blob = new Blob([response._body], { type: 'text/plain' });
    saveAs(blob, filename);
  }

  goBack():void {
    this.location.back()
  }

  onClickDelete() {
     this.praiserecordingService.deletePraiseRecording(this.route.snapshot.params.id)
    .subscribe(()=> this.router.navigate(['/PraiseRecordingListComponent']));
  }
}

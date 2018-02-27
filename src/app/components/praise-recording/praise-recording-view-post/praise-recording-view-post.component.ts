import { Component, OnInit } from '@angular/core';
import { PraiseRecording } from '../model/PraiseRecording';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { PraiserecordingService } from '../service/praiserecording.service';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as FileSaver from 'file-saver';
import { config } from '../../../config';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-praise-recording-view-post',
  templateUrl: './praise-recording-view-post.component.html',
  styleUrls: ['./praise-recording-view-post.component.css']
})
export class PraiseRecordingViewPostComponent implements OnInit {
  praiseRecording: PraiseRecording;
  imageFile: ByteString;
  fileName: string;
  isAdmin: boolean = false;
  isOwner: boolean = false;
  filePath: string;

  private baseUrl = config.backendAPIUrl;

  constructor(
    private route: ActivatedRoute,
    private praiserecordingService: PraiserecordingService,
    private router: Router,
    private location: Location,
    private http: Http,
    private store: Store<fromApp.AppState>
  ) {

  }

  ngOnInit() {
    this.route.paramMap
      // (+) converts string 'id' to a number (+params.get('id'))
      .switchMap((params: ParamMap) => this.praiserecordingService.getPraiseRecording(params.get('id')))
      .map(praiseRecording => {
        this.praiseRecording = praiseRecording;
        this.fileName = praiseRecording.title + ".mp3";
      })
      .subscribe(() => {
        this.getFile();
        this.onCheckAdmin();
      });
  }

  getFile() {
    this.filePath = `${this.baseUrl}/praiserecording-file?filename=${this.fileName}`;
  }

  downloadFile() {
    this.praiserecordingService.downloadFile(this.fileName).subscribe(data => {
      FileSaver.saveAs(data, this.fileName);
    }
    )
  }

  goBack(): void {
    this.location.back()
  }

  onClickDelete() {
    this.praiserecordingService.deletePraiseRecording(this.route.snapshot.params.id)
      .subscribe(() => this.router.navigate(['/praise-recording/list']));
  }

  onCheckAdmin() {
    this.store.select('auth').subscribe((res) => {
      this.isAdmin = res.isAdmin;
      this.onCheckOwner();
    })
  }

  onCheckOwner() {
    let username: string;
    this.store.select('auth').subscribe((res) => {
      username = res.currentUsername;
    })
    if (username == this.praiseRecording.author) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }
  }
}

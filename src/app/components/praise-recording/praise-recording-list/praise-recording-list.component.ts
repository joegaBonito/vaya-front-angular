import { Component, OnInit } from '@angular/core';
import {PraiseRecording} from '../model/PraiseRecording';
import {PraiserecordingService} from '../service/praiserecording.service';

@Component({
  selector: 'app-praise-recording-list',
  templateUrl: './praise-recording-list.component.html',
  styleUrls: ['./praise-recording-list.component.css']
})
export class PraiseRecordingListComponent implements OnInit {

  items:PraiseRecording[];
  selectedPost:PraiseRecording;
  isLoading: boolean = false;
  p: number = 1;
  collection: any[] = this.items;

  constructor(private praiserecordingService:PraiserecordingService) { }

  getPraiseRecordings():void {
    this.isLoading=true;
    this.praiserecordingService.getPraiseRecordings()
    .subscribe(praiseRecordings => {
      this.items = praiseRecordings;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getPraiseRecordings();
  }

}

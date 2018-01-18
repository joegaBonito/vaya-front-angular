import { Component, OnInit } from '@angular/core';
import {PictureList} from '../model/PictureList';
import { PictureService } from '../service/picture.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/Observable';

@Component({
  selector: 'app-pictureList-list',
  templateUrl: './pictureList-list.component.html',
  styleUrls: ['./pictureList-list.component.css']
})
export class PictureListListComponent implements OnInit {
  items:PictureList[] = [];
  isLoading:boolean = false;
  id:number;
  filePath:string;

  private baseUrl = this.pictureService.baseUrl;

  constructor(private pictureService:PictureService,
              private router:Router) { }

  ngOnInit() {
    this.getPictures();
    this.filePath = this.baseUrl + "/pictureList-file/";
  }

  getPictures():void {
    this.isLoading=true;
    this.pictureService.getPictureLists()
    .subscribe(pictures => {
      this.items = pictures;
      this.isLoading = false;
    });
  }
}

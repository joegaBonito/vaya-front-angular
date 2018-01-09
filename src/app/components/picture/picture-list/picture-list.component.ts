import { Component, OnInit } from '@angular/core';
import {Picture} from '../model/Picture';
import { PictureService } from '../service/picture.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/Observable';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {
  items:Picture[] = [];
  isLoading:boolean = false;
  id:number;
  filePath:string;

  private baseUrl = 'http://192.168.0.6:3175';

  constructor(private pictureService:PictureService,
              private router:Router) { }



  ngOnInit() {
    this.getPictures();
    this.filePath = this.baseUrl + "/picture-file/";
  }

  getPictures():void {
    this.isLoading=true;
    this.pictureService.getPictures()
    .subscribe(pictures => {
      this.items = pictures;
      this.isLoading = false;
    });
  }
}

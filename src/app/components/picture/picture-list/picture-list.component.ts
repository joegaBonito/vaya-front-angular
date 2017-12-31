import { Component, OnInit } from '@angular/core';
import {Picture} from '../model/Picture';
import { PictureService } from '../service/picture.service';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {
  items:Picture[] = [];
  isLoading:boolean = false;

  constructor(private pictureService:PictureService) { }

  ngOnInit() {
    this.getPictures();
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

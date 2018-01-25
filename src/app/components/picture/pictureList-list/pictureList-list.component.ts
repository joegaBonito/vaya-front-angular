import { Component, OnInit } from '@angular/core';
import {PictureList} from '../model/PictureList';
import { PictureService } from '../service/picture.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
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
  isAdmin:boolean = false;

  private baseUrl = this.pictureService.baseUrl;

  constructor(private pictureService:PictureService,
              private router:Router) { }

  ngOnInit() {
    this.isLoading=true;
    this.pictureService.getPictureLists()
    .map((pictures:PictureList[]) => {
      this.items = pictures;  
      this.isLoading = false
    })
    .subscribe();
    this.filePath = this.baseUrl + "/pictureList-file/";
    this.onCheckAdmin();
  }

  onCheckAdmin(){
    this.pictureService.onCheckAdmin().subscribe((res)=> {
      if(res == true) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  onClickDelete(id:string) {
    this.pictureService.deletePictureList(id)
    .subscribe(()=> {
      window.location.reload();
    });
  }
}

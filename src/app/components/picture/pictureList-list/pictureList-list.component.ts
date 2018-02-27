import { Component, OnInit } from '@angular/core';
import {PictureList} from '../model/PictureList';
import { PictureService } from '../service/picture.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-pictureList-list',
  templateUrl: './pictureList-list.component.html',
  styleUrls: ['./pictureList-list.component.css']
})
export class PictureListListComponent implements OnInit {
  [x: string]: any;
  items:PictureList[] = [];
  isLoading:boolean = false;
  id:number;
  filePath:string;
  isAdmin:boolean = false;
  private baseUrl = this.pictureService.baseUrl;

  constructor(private pictureService:PictureService,
              private router:Router,
              private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.isLoading=true;
    this.pictureService.getPictureLists()
    .map((pictures:PictureList[]) => {
      this.items = pictures;  
      this.isLoading = false
    })
    .subscribe();
    this.filePath = `${this.baseUrl}/pictureList-file?filename=`;
    this.onCheckAdmin();
  }

  onCheckAdmin(){
    this.store.select('auth').subscribe((res)=>{
      this.isAdmin = res.isAdmin;
    });
  }

  onClickEdit(id:string) {
    this.router.navigate(['/picture/pictureList-edit',id]);
  }

  onClickDelete(id:string) {
    this.pictureService.deletePictureList(id)
    .subscribe(()=> {
      window.location.reload();
    });
  }
}

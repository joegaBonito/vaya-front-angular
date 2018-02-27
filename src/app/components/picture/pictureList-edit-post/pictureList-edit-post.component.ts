import { Component, OnInit } from '@angular/core';
import { PictureList } from '../model/PictureList';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PictureService} from '../service/picture.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-pictureList-edit-post',
  templateUrl: './pictureList-edit-post.component.html',
  styleUrls: ['./pictureList-edit-post.component.css']
})
export class PictureListEditPostComponent implements OnInit {
  pictureList:PictureList;
  fileData:File;
  originalFileName:string;
  filePath:string;

  private baseUrl = this.pictureService.baseUrl;

  constructor(private router:Router,
              private route:ActivatedRoute,
              private flashMessagesService:FlashMessagesService,
              private pictureService:PictureService,
              private location:Location,
              private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.filePath = this.baseUrl + "/pictureList-file/";
    this.route.paramMap
    .switchMap((params:ParamMap)=>this.pictureService.getPictureList(params.get('id')))
    .subscribe(pictureList =>{
      this.pictureList = pictureList;
    });
  }

  fileChange(event) {
      this.fileData = event.target.files[0];
      this.originalFileName = this.fileData.name;
  }

  onSubmit({value,valid}:{value:PictureList, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['/picture/pictureList-edit']);
    } else {
      this.pictureService.editPictureListPost(value,this.fileData,this.originalFileName,this.route.snapshot.params.id).subscribe(()=>{
        this.router.navigate(['/picture/pictureList-list']);
        this.flashMessagesService.show('Picture Category has been edited',{cssClass:'alert-success',timeout:3000});
      });
    }
  }

  onClickBack(): void {
    this.router.navigate(['/picture/pictureList-list']);
  }

}

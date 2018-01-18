import { Component, OnInit } from '@angular/core';
import { PictureList } from '../model/PictureList';
import { Router } from '@angular/router';
import { PictureService} from '../service/picture.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {LoginService} from '../../login/service/login.service';

@Component({
  selector: 'app-pictureList-create-post',
  templateUrl: './pictureList-create-post.component.html',
  styleUrls: ['./pictureList-create-post.component.css']
})
export class PictureListCreatePostComponent implements OnInit {
  pictureList:PictureList = new PictureList();
  fileData:File;
  originalFileName:string;

  constructor(private router:Router,
              private flashMessagesService:FlashMessagesService,
              private pictureService:PictureService,
              private loginService:LoginService) { }

  ngOnInit() {
    //this.picture.author = this.loginService.getUsername();
  }

  fileChange(event) {
      this.fileData = event.target.files[0];
      this.originalFileName = this.fileData.name;
  }

  onSubmit({value,valid}:{value:PictureList, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['/picture/pictureList-create']);
    } else {
      this.pictureService.newPictureListPost(value,this.fileData,this.originalFileName).subscribe(()=>{
        this.router.navigate(['/picture/pictureList-list']);
        this.flashMessagesService.show('New Picture Category has been added',{cssClass:'alert-success',timeout:3000});
      });
    }
  }
}

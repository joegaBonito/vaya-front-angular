import { Component, OnInit } from '@angular/core';
import { Picture } from '../model/Picture';
import { Router } from '@angular/router';
import { PictureService} from '../service/picture.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {LoginService} from '../../login/service/login.service';

@Component({
  selector: 'app-picture-create-post',
  templateUrl: './picture-create-post.component.html',
  styleUrls: ['./picture-create-post.component.css']
})
export class PictureCreatePostComponent implements OnInit {
  picture:Picture = new Picture();
  fileData:File;
  originalFileName:string;

  constructor(private router:Router,
              private flashMessagesService:FlashMessagesService,
              private pictureService:PictureService,
              private loginService:LoginService) { }

  ngOnInit() {
    this.picture.author = this.loginService.getUsername();
  }

  fileChange(event) {
      this.fileData = event.target.files[0];
      this.originalFileName = this.fileData.name;
  }

  onSubmit({value,valid}:{value:Picture, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['/picture/create']);
    } else {
      this.pictureService.newPicturePost(value,this.fileData,this.originalFileName).subscribe(()=>{
        this.router.navigate(['/picture/list']);
        this.flashMessagesService.show('New Post has been added',{cssClass:'alert-success',timeout:3000});
      });
    }
  }
}

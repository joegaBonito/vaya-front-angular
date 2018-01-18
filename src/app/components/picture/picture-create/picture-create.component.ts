import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { PictureService } from '../service/picture.service';
import { Picture } from '../model/Picture';
import { PictureList } from '../model/PictureList';
import { FlashMessagesService } from 'angular2-flash-messages';
import {LoginService} from '../../login/service/login.service';

@Component({
  selector: 'app-picture-create-post',
  templateUrl: './picture-create.component.html',
  styleUrls: ['./picture-create.component.css']
})
export class PictureCreateComponent implements OnInit {
    picture:Picture =  new Picture();
    pictureList:PictureList[] = [];
    fileData:File;
    originalFileName:string;
    categoryId: string;
    constructor(private route:ActivatedRoute,
                private router:Router,
                private pictureService:PictureService,
                private loginService:LoginService,
                private flashMessagesService:FlashMessagesService){
    }

    ngOnInit() {
        this.picture.author = this.loginService.getUsername();
        this.route.params.subscribe((params: Params) => {
            this.categoryId = params['id'];
        })
      }
    
      fileChange(event) {
          this.fileData = event.target.files[0];
          this.originalFileName = this.fileData.name;
      }
    
      onSubmit({value,valid}:{value:Picture, valid:boolean}) {
        if(!valid) {
          this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
          this.router.navigate(['/picture/create',this.categoryId]);
        } else {
          this.pictureService.newPicturePost(value,this.fileData,this.originalFileName,this.categoryId).subscribe(()=>{
            this.router.navigate(['/picture/list',this.categoryId]);
            this.flashMessagesService.show('New Picture has been added',{cssClass:'alert-success',timeout:3000});
          });
        }
      }
}
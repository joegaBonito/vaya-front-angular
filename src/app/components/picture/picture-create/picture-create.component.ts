import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params} from '@angular/router';
import { PictureService } from '../service/picture.service';
import { Picture } from '../model/Picture';
import { PictureList } from '../model/PictureList';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

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
                private flashMessagesService:FlashMessagesService,
                private store:Store<fromApp.AppState>){
    }

    ngOnInit() {
        this.store.select('auth').map((res)=>{
          this.picture.author = res.currentUsername;
        });
        this.route.params.subscribe((params: Params) => {
            this.categoryId = params['id'];
        });
        this.picture.date= JSON.stringify(Date.now());
      }
    
      fileChange(event) {
          this.fileData = event.target.files[0];
          this.originalFileName = this.fileData.name;
      }

      onClickBack() {
        this.router.navigate(['/picture/list',this.categoryId]);
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
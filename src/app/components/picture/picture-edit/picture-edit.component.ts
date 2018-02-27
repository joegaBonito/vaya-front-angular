import { Component, OnInit } from '@angular/core';
import { PictureService } from '../service/picture.service';
import { Picture } from '../model/Picture';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { Location }                 from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-picture-edit-post',
  templateUrl: './picture-edit.component.html',
  styleUrls: ['./picture-edit.component.css']
})
export class PictureEditComponent implements OnInit {
  picture:Picture;
  fileData:File;
  fileDataChanged:boolean = false;
  originalFileName:string;
  filePath:string;
  pictureId:string;
  categoryId: string;

  private baseUrl = this.pictureService.baseUrl;

  constructor(private pictureService:PictureService,
              private route:ActivatedRoute,
              private router:Router,
              private location:Location,
              private flashMessagesService:FlashMessagesService,
              private store:Store<fromApp.AppState>) {

  }

  ngOnInit() {
    this.route.paramMap
      // (+) converts string 'id' to a number (+params.get('id'))
      .switchMap((params: ParamMap) => this.pictureService.getPicture(params.get('id2')))
      .map((picture)=>{
        this.picture = picture;
        this.store.select('auth').subscribe((res)=>{
          this.picture.author = res.currentUsername;
        });
      })
      .subscribe();
      this.filePath = this.baseUrl + "/picture-file?filename=";
      this.route.params.subscribe((params: Params) => {
        this.categoryId = params['id1'];
        this.pictureId = params['id2'];
    })
  }
  fileChange(event) {
    this.fileData = event.target.files[0];
    this.fileDataChanged = true;
    this.originalFileName = this.fileData.name;
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit({ value, valid }: { value: Picture, valid: boolean }) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in all required fields', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/picture/edit', this.categoryId ,this.picture.id]);
    } else {
      this.pictureService.editPicturePost(value, this.fileData,this.originalFileName,this.pictureId)
        .subscribe(res => {
          this.router.navigate(['/picture/list',this.categoryId]);
          this.flashMessagesService.show('Client has been edited', { cssClass: 'alert-success', timeout: 3000 });
        });
    }
  }
}
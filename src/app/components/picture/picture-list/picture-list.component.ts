import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PictureService } from '../service/picture.service';
import { Picture } from '../model/Picture';
import { Location } from '@angular/common';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { LoginService } from '../../login/service/login.service';

@Component({
    selector: 'app-picture-list-post',
    templateUrl: './picture-list.component.html',
    styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {
    picture:Picture;
    items: Picture[];
    categoryId: string;
    filePath: string;
    galleryOptions: NgxGalleryOptions[] = [];
    galleryImages: NgxGalleryImage[] = [];
    hiddenVar:boolean = true;
    isAdmin:boolean = false;
    p: number = 1;

    private baseUrl = this.pictureService.baseUrl;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private pictureService: PictureService,
        private location:Location,
        private loginService:LoginService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.categoryId = params['id'];
        })
        this.filePath = this.baseUrl + "/picture-file/";
        this.pictureService.getPictures(this.categoryId)
            .mergeMap((res:Picture[]) => {
                res.map(item => {
                        this.galleryImages.push({
                            small: this.filePath + item.id,
                            medium: this.filePath + item.id,
                            big: this.filePath + item.id
                        })
                    }
                )
                this.items = res;
                return res;
            })
            .subscribe();
        this.galleryOptions = [
            {
                width: '800px',
                height: '600px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                thumbnailsRemainingCount: true,
                thumbnailsArrows: false,
                previewCloseOnEsc:true,
                lazyLoading:true
            },
            // max-width 400
            {
                breakpoint: 400,
                imageArrows: false,
                previewCloseOnClick:true,
                preview: true
            },
            // max-width 800
            {
                image: true,
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20,
                imageArrows: false,
                arrowPrevIcon: 'fa fa-arrow-circle-left',
                arrowNextIcon: 'fa fa-arrow-circle-right',
            }
        ];
        this.onCheckAdmin();
    }

    navShow() {
        document.querySelector("nav").style.display = 'flex';
    }

    navHide() {
        document.querySelector("nav").style.display = 'none';
    }

    goBack() {
        this.location.back();
    }
    onClickEdit() {
        this.hiddenVar = !this.hiddenVar;
    }
    onClickDelete(id:string) {
        this.pictureService.deletePicture(id)
        .subscribe(()=>{
            window.location.reload();
        });
    }

    onCheckAdmin(){
        this.loginService.onCheckAdmin().subscribe((res)=> {
          if(res == true) {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        });
      }
}
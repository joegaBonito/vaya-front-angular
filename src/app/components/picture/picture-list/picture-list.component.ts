import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PictureService } from '../service/picture.service';
import { Picture } from '../model/Picture';

@Component({
  selector: 'app-picture-list-post',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css']
})
export class PictureListComponent implements OnInit {
    items: Picture[];
    categoryId: string;
    filePath:string;

    private baseUrl = this.pictureService.baseUrl;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private pictureService: PictureService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.categoryId = params['id'];
        })
        this.pictureService.getPictures(this.categoryId).subscribe((res) => {
            this.items = res;
        })
        this.filePath = this.baseUrl + "/picture-file/";
    }
}
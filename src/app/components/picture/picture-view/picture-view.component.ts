import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PictureService } from '../service/picture.service';
import { Picture } from '../model/Picture';

@Component({
    selector: 'app-picture-view-post',
    templateUrl: './picture-view.component.html',
    styleUrls: ['./picture-view.component.css']
})
export class PictureViewComponent implements OnInit {
    items: Picture[] = [];
    categoryId: string;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private pictureService: PictureService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.categoryId = params['id'];
        })
    }
}
import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { SermonPost } from '../model/SermonPost';
import { SermonService } from '../service/sermon.service';

@Component({
  selector: 'app-sermon-view-post',
  templateUrl: './sermon-view-post.component.html',
  styleUrls: ['./sermon-view-post.component.css']
})
export class SermonViewPostComponent implements OnInit {

  sermonPost:SermonPost;

  constructor(
    private sermonService: SermonService,
    private route:ActivatedRoute,
    private location:Location

  ) { }

  ngOnInit() {
    this.route.paramMap
          // (+) converts string 'id' to a number (+params.get('id'))
         .switchMap((params: ParamMap) => this.sermonService.getSermonPost(params.get('id')))
         .subscribe(sermonPost => this.sermonPost = sermonPost);
  }

  goBack(): void {
    this.location.back();
  }

}

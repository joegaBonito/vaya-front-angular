import { Component, OnInit } from '@angular/core';
import {SermonPost} from '../model/SermonPost';
import { SermonService } from '../service/sermon.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from '../../login/service/login.service';

@Component({
  selector: 'app-sermon-edit-post',
  templateUrl: './sermon-edit-post.component.html',
  styleUrls: ['./sermon-edit-post.component.css']
})
export class SermonEditPostComponent implements OnInit {

  sermonPost:SermonPost;
  submitted:boolean = false;

  constructor(
    private sermonService:SermonService,
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute,
    private loginService:LoginService) {

    }

  ngOnInit() {
    this.route.paramMap
    .switchMap((params:ParamMap)=>this.sermonService.getSermonPost(params.get('id')))
    .subscribe(sermonPost =>{
      this.sermonPost = sermonPost;
      this.sermonPost.author = this.loginService.getUsername();
    });
  }

  onSubmit({value,valid}:{value:SermonPost, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['SermonEditPostComponent',this.sermonPost.id]);
    } else {
      this.sermonService.editSermonPost(this.route.snapshot.params.id,value)
      .subscribe(res=>{
        this.router.navigate(['/sermon/list']);
        this.flashMessagesService.show('Sermon Post has been edited',{cssClass:'alert-success',timeout:3000});
      });
    }
  }
}

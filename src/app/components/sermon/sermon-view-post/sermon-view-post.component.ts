import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';
import { SermonPost } from '../model/SermonPost';
import { SermonService } from '../service/sermon.service';
import { LoginService } from '../../login/service/login.service';

@Component({
  selector: 'app-sermon-view-post',
  templateUrl: './sermon-view-post.component.html',
  styleUrls: ['./sermon-view-post.component.css']
})
export class SermonViewPostComponent implements OnInit {
  isAdmin:boolean = false;
  isOwner:boolean = false;
  sermonPost:SermonPost;

  constructor(
    private sermonService: SermonService,
    private router:Router,
    private route:ActivatedRoute,
    private location:Location,
    private loginService:LoginService
  ) { }

  ngOnInit() {
    this.route.paramMap
          // (+) converts string 'id' to a number (+params.get('id'))
         .switchMap((params: ParamMap) => this.sermonService.getSermonPost(params.get('id')))
         .subscribe(sermonPost => this.sermonPost = sermonPost);
    this.onCheckAdmin();
  }

  goBack(): void {
    this.location.back();
  }

  onClickDelete() {
    this.route.paramMap
    .switchMap((params:ParamMap) => this.sermonService.deleteSermonPost(params.get('id')))
    .subscribe(()=> this.router.navigate(['/SermonListComponent']));
  }

  onCheckAdmin(){
    this.sermonService.onCheckAdmin().subscribe((res)=> {
      if(res == true) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
        this.onCheckOwner();
      }
    });
  }

  onCheckOwner(){
      if(this.loginService.getUsername() == this.sermonPost.author) {
        this.isOwner = true;
      } else {
        this.isOwner = false;
      }
  }

}

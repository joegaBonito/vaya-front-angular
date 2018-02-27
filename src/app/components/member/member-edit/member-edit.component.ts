import { OnInit, Component } from "@angular/core";
import { Member } from "../../login/model/Member";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {Location } from '@angular/common';
import { MemberService } from "../service/member.service";
import { Store } from "@ngrx/store";
import * as fromApp from '../../../store/app.reducer';

@Component({
    selector:'app-member-edit-component',
    templateUrl:'./member-edit.component.html',
    styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{
    [x: string]: any;
    member:Member;


    constructor(private flashMessagesService:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute,
    private memberService:MemberService,
    private store:Store<fromApp.AppState>
){

    }

    ngOnInit() {
      this.route.paramMap
        // (+) converts string 'id' to a number (+params.get('id'))
       .switchMap((params: ParamMap) => this.memberService.getMember(params.get('id')))
       .subscribe(member => {
         this.member = member;
         this.onCheckAdmin();
       });
    }

    onCheckAdmin(){
      this.store.select('auth').map((res)=>{
        this.isAdmin = res.isAdmin;
        this.onCheckOwner();
      });
    }
  
    onCheckOwner(){
      let username:string;
      this.store.select('auth').subscribe((res)=>{
        username = res.currentUsername;
      });
        if(username == this.member.email) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
    }

    onSubmit({value,valid}:{value:Member,valid:boolean}) {
        if(!valid) {
          this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:1000});
          window.location.reload();
        } else {
          this.memberService.editMember(this.route.snapshot.params.id,value).subscribe(()=>{
            this.router.navigate(['/member/list']);
            this.flashMessagesService.show('Member edit Successful!',{cssClass:'alert-success',timeout:1000});
          });
        }
      }
}
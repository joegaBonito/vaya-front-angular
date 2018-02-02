import { OnInit, Component } from "@angular/core";
import { Member } from "../../login/model/Member";
import { FlashMessagesService } from "angular2-flash-messages";
import { LoginService } from "../../login/service/login.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import {Location } from '@angular/common';
import { MemberService } from "../service/member.service";

@Component({
    selector:'app-member-edit-component',
    templateUrl:'./member-edit.component.html',
    styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit{
    member:Member;


    constructor(private flashMessagesService:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute,
    private memberService:MemberService,
){

    }

    ngOnInit() {
        this.route.paramMap
        // (+) converts string 'id' to a number (+params.get('id'))
       .switchMap((params: ParamMap) => this.memberService.getMember(params.get('id')))
       .subscribe(member => {
         this.member = member;
       });
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
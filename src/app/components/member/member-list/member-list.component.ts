import { OnInit, Component } from "@angular/core";
import { Member } from "../../login/model/Member";
import { MemberService } from "../service/member.service";

@Component({
    selector:'app-member-list-component',
    templateUrl:'./member-list.component.html',
    styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
    items:Member[];

    constructor(private memberService:MemberService){

    }

    ngOnInit() {
        this.memberService.getMemberList().map((res) => { 
            this.items =　res;
        })
        .subscribe();
    }
}
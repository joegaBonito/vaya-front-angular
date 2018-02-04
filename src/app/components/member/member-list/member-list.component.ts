import { OnInit, Component } from "@angular/core";
import { Member } from "../../login/model/Member";
import { MemberService } from "../service/member.service";
import {Location} from '@angular/common';

@Component({
    selector:'app-member-list-component',
    templateUrl:'./member-list.component.html',
    styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
    items:Member[];
    p: number = 1;

    constructor(private memberService:MemberService){

    }

    ngOnInit() {
        this.memberService.getMemberList().map((res) => { 
            this.items =　res;
        })
        .subscribe();
    }

    onClickDelete(id:string) {
        this.memberService.deleteMember(id).subscribe();
        window.location.reload();
    }
}
import { Component, OnInit } from "@angular/core";
import { Member } from "../model/Member";
import { ParamMap, ActivatedRoute, Router, Params } from "@angular/router";
import { MemberService } from "../../member/service/member.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { Store } from "@ngrx/store";
import * as fromApp from '../../../store/app.reducer';

@Component({
    selector: 'app-profile-edit-component',
    styleUrls: ['./profile-edit-component.css'],
    templateUrl: './profile-edit-component.html'
})
export class ProfileEditComponent implements OnInit {
    [x: string]: any;
    member: Member;
    isSelf: boolean;
    isLoading: boolean = true;

    constructor(private flashMessagesService: FlashMessagesService,
        private router: Router,
        private route: ActivatedRoute,
        private memberService: MemberService,
        private store: Store<fromApp.AppState>) { }

    ngOnInit() {
        this.store.select('auth').subscribe((res) => {
            this.userId = res.userId;
        })
        this.memberService.getMember(this.userId)
            .take(1)
            .do(() => this.isLoading = true)
            .map((member: Member) => {
                this.member = member;
                //console.log(member);
            })
            .subscribe(() => this.isLoading = false)
    }

    onClickBack() {
        this.router.navigate(['/']);
    }

    onSubmit({ value, valid }: { value: Member, valid: boolean }) {
        if (!valid) {
            this.flashMessagesService.show('Please fill in all required fields', { cssClass: 'alert-danger', timeout: 1000 });
            window.location.reload();
        } else {
            this.memberService.editMember(this.userId, value).subscribe(() => {
                this.router.navigate(['/']);
                this.flashMessagesService.show('Profile Edit Successful!', { cssClass: 'alert-success', timeout: 1000 });
            });
        }
    }
}
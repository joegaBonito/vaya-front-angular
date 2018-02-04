import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MemberRoutingModule} from './member-routing.module';
import { CommonModule } from '@angular/common';


//Components
import { MemberComponent } from './member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberViewComponent } from './member-view/member-view.component';
import { AdminGuard } from '../guards/admin.guard';


@NgModule({
    declarations: [
        MemberComponent,
        MemberListComponent,
        MemberEditComponent,
        MemberViewComponent
      ],
      imports: [
          CommonModule,
          FormsModule,
          NgxPaginationModule,
          MemberRoutingModule
      ],
      providers: [
        AdminGuard
      ]
})

export class MemberModule {}
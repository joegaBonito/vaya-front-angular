import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//Components
import { MemberComponent } from './member.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberViewComponent } from './member-view/member-view.component';

//Guards
import { AuthGuard } from '../../components/guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

const appRoutes:Routes = [
  {path:'', component:MemberComponent, canActivate:[AuthGuard], canActivateChild:[AuthGuard,AdminGuard], children:[
    {path:"list",component: MemberListComponent},
    {path:"edit/:id",component: MemberEditComponent},
    {path:":id",component: MemberViewComponent}
  ]}
];

@NgModule({
  imports:[
    RouterModule.forChild(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})

export class MemberRoutingModule{}

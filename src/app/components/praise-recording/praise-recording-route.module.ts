import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//Components
import { PraiseRecording } from './praise-recording.component';
import { PraiseRecordingListComponent } from './praise-recording-list/praise-recording-list.component';
import { PraiseRecordingCreatePostComponent } from './praise-recording-create-post/praise-recording-create-post.component';
import { PraiseRecordingEditPostComponent } from './praise-recording-edit-post/praise-recording-edit-post.component';
import { PraiseRecordingViewPostComponent } from './praise-recording-view-post/praise-recording-view-post.component';


//Guards
import { AuthGuard } from '../../components/guards/auth.guard';
import { GnbStatusGuard } from '../../components/guards/gnb-status.guard';

const appRoutes:Routes = [
  {path:"",component:PraiseRecording, canActivate:[AuthGuard], canActivateChild:[AuthGuard], children:[
    {path:"list",component: PraiseRecordingListComponent},
    {path:"create",component: PraiseRecordingCreatePostComponent},
    {path:"edit/:id",component: PraiseRecordingEditPostComponent},
    {path:":id",component: PraiseRecordingViewPostComponent},
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

export class PraiseRecordingRouteModule{}

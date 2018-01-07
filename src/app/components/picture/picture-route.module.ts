import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//Components
import { Picture } from './picture.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { PictureCreatePostComponent } from './picture-create-post/picture-create-post.component';
import { PictureEditPostComponent } from './picture-edit-post/picture-edit-post.component';
import { PictureViewPostComponent } from './picture-view-post/picture-view-post.component';

//Guards
import { AuthGuard } from '../../components/guards/auth.guard';
import { GnbStatusGuard } from '../../components/guards/gnb-status.guard';

const appRoutes:Routes = [
  {path:"",component:Picture, children:[
    {path:"list",component: PictureListComponent, canActivate:[GnbStatusGuard]},
    {path:"create",component: PictureCreatePostComponent, canActivate:[AuthGuard]},
    {path:"edit/:id",component: PictureEditPostComponent, canActivate:[AuthGuard]},
    {path:":id",component: PictureViewPostComponent, canActivate:[AuthGuard]}
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

export class PictureRouteModule{}

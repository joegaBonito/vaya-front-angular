import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//Components
import { Picture } from './picture.component';

//Picture Components
import { PictureListComponent} from './picture-list/picture-list.component';
import { PictureCreateComponent} from './picture-create/picture-create.component';
import { PictureEditComponent} from './picture-edit/picture-edit.component';
import { PictureViewComponent} from './picture-view/picture-view.component';

//Picture-List Components
import { PictureListListComponent } from './pictureList-list/pictureList-list.component';
import { PictureListCreatePostComponent } from './pictureList-create-post/pictureList-create-post.component';
import { PictureListEditPostComponent } from './pictureList-edit-post/pictureList-edit-post.component';
import { PictureListViewPostComponent } from './pictureList-view-post/pictureList-view-post.component';

//Guards
import { AuthGuard } from '../../components/guards/auth.guard';

const appRoutes:Routes = [
  {path:"",component:Picture, children:[
    {path:"pictureList-list",component: PictureListListComponent},
    {path:"pictureList-create",component: PictureListCreatePostComponent, canActivate:[AuthGuard]},
    {path:"pictureList-edit/:id",component: PictureListEditPostComponent, canActivate:[AuthGuard]},
    {path:"pictureList/:id",component: PictureListViewPostComponent, canActivate:[AuthGuard]},
    {path:"list/:id",component: PictureListComponent},
    {path:"create/:id",component: PictureCreateComponent, canActivate:[AuthGuard]},
    {path:"edit/:id1/:id2",component: PictureEditComponent, canActivate:[AuthGuard]},
    {path:":id",component: PictureViewComponent, canActivate:[AuthGuard]},
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

import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//Components
import { SermonComponent } from './sermon.component';
import { SermonListComponent } from './sermon-list/sermon-list.component';
import { SermonCreatePostComponent } from './sermon-create-post/sermon-create-post.component';
import { SermonEditPostComponent } from './sermon-edit-post/sermon-edit-post.component';
import { SermonViewPostComponent } from './sermon-view-post/sermon-view-post.component';


//Guards
import { AuthGuard } from '../../components/guards/auth.guard';

const appRoutes:Routes = [
  {path:'', component:SermonComponent, canActivate:[AuthGuard], canActivateChild:[AuthGuard], children:[
    {path:"list",component: SermonListComponent},
    {path:"create",component: SermonCreatePostComponent},
    {path:"edit/:id",component: SermonEditPostComponent},
    {path:":id",component: SermonViewPostComponent}
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

export class SermonRouteModule{}

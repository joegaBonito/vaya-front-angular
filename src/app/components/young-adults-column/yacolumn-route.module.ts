import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//Components
import { YAColumn } from './yacolumn.component';
import { YoungAdultsColumnListComponent } from './young-adults-column-list/young-adults-column-list.component';
import { YoungAdultsColumnCreatePostComponent } from './young-adults-column-create-post/young-adults-column-create-post.component';
import { YoungAdultsColumnEditPostComponent } from './young-adults-column-edit-post/young-adults-column-edit-post.component';
import { YoungAdultsColumnViewPostComponent } from './young-adults-column-view-post/young-adults-column-view-post.component';


//Guards
import { AuthGuard } from '../../components/guards/auth.guard';
import { GnbStatusGuard } from '../../components/guards/gnb-status.guard';

const appRoutes:Routes = [
  {path: "",component:YAColumn, canActivate:[AuthGuard], canActivateChild:[AuthGuard],children:[
    {path:"list",component: YoungAdultsColumnListComponent, canActivate:[AuthGuard]},
    {path:"create",component: YoungAdultsColumnCreatePostComponent, canActivate:[AuthGuard]},
    {path:"edit/:id",component: YoungAdultsColumnEditPostComponent, canActivate:[AuthGuard]},
    {path:":id",component: YoungAdultsColumnViewPostComponent, canActivate:[AuthGuard]},
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

export class YAColumnRouteModule{}

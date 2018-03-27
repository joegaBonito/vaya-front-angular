

import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

//Components
import { NewcommerViewComponent } from './newcommer-view/newcommer-view.component';
import { NewcommerComponent } from './newcommer.component';

//Guards
import { AuthGuard } from '../../components/guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

const appRoutes:Routes = [
  {path:'', component:NewcommerComponent, children:[
    // {path:"list",component: MemberListComponent},
    // {path:"edit/:id",component: MemberEditComponent},
    {path:"view",component: NewcommerViewComponent}
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

export class NewCommerRoutingModule{}
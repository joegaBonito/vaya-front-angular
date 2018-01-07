import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PictureRouteModule } from './picture-route.module';

import { Picture } from './picture.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { PictureCreatePostComponent } from './picture-create-post/picture-create-post.component';
import { PictureEditPostComponent } from './picture-edit-post/picture-edit-post.component';
import { PictureViewPostComponent } from './picture-view-post/picture-view-post.component';

//npm libraries
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    Picture,
    PictureListComponent,
    PictureCreatePostComponent,
    PictureEditPostComponent,
    PictureViewPostComponent,
  ],
  imports: [
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      PictureRouteModule
  ]
})
export class PictureModule {}

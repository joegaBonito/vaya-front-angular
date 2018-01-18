import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PictureRouteModule } from './picture-route.module';

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

//npm libraries
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    Picture,
    PictureListComponent,
    PictureCreateComponent,
    PictureEditComponent,
    PictureViewComponent,
    PictureListListComponent,
    PictureListCreatePostComponent,
    PictureListEditPostComponent,
    PictureListViewPostComponent,
  ],
  imports: [
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      PictureRouteModule
  ]
})
export class PictureModule {}

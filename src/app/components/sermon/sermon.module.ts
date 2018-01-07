import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SermonRouteModule } from './sermon-route.module';

import { SermonComponent } from './sermon.component';
import { SermonListComponent } from './sermon-list/sermon-list.component';
import { SermonCreatePostComponent } from './sermon-create-post/sermon-create-post.component';
import { SermonEditPostComponent } from './sermon-edit-post/sermon-edit-post.component';
import { SermonViewPostComponent } from './sermon-view-post/sermon-view-post.component';

//npm libraries
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    SermonComponent,
    SermonListComponent,
    SermonCreatePostComponent,
    SermonEditPostComponent,
    SermonViewPostComponent,
  ],
  imports: [
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      SermonRouteModule
  ]
})
export class SermonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YAColumnRouteModule } from './yacolumn-route.module';

import { YAColumn } from './yacolumn.component';
import { YoungAdultsColumnListComponent } from './young-adults-column-list/young-adults-column-list.component';
import { YoungAdultsColumnCreatePostComponent } from './young-adults-column-create-post/young-adults-column-create-post.component';
import { YoungAdultsColumnEditPostComponent } from './young-adults-column-edit-post/young-adults-column-edit-post.component';
import { YoungAdultsColumnViewPostComponent } from './young-adults-column-view-post/young-adults-column-view-post.component';

//npm libraries
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    YAColumn,
    YoungAdultsColumnListComponent,
    YoungAdultsColumnCreatePostComponent,
    YoungAdultsColumnEditPostComponent,
    YoungAdultsColumnViewPostComponent,
  ],
  imports: [
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      YAColumnRouteModule
  ]
})
export class YAColumnModule {}

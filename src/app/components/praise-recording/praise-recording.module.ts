import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PraiseRecordingRouteModule } from './praise-recording-route.module';

import { PraiseRecording } from './praise-recording.component';
import { PraiseRecordingListComponent } from './praise-recording-list/praise-recording-list.component';
import { PraiseRecordingCreatePostComponent } from './praise-recording-create-post/praise-recording-create-post.component';
import { PraiseRecordingEditPostComponent } from './praise-recording-edit-post/praise-recording-edit-post.component';
import { PraiseRecordingViewPostComponent } from './praise-recording-view-post/praise-recording-view-post.component';

//npm libraries
import {NgxPaginationModule} from 'ngx-pagination';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  declarations: [
    PraiseRecording,
    PraiseRecordingListComponent,
    PraiseRecordingCreatePostComponent,
    PraiseRecordingEditPostComponent,
    PraiseRecordingViewPostComponent,
  ],
  imports: [
      CommonModule,
      FormsModule,
      NgxPaginationModule,
      PraiseRecordingRouteModule,
      NgProgressModule
  ]
})
export class PraiseRecordingModule {}

//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AgmCoreModule} from '@agm/core';
import { Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { GnbComponent } from './components/gnb/gnb.component';
import { BannerComponent } from './components/banner/banner.component';
import { Front1Component } from './components/front1/front1.component';
import { Front2Component } from './components/front2/front2.component';
import { Front3Component } from './components/front3/front3.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { WorshipServiceComponent } from './components/worship-service/worship-service.component';
import { AlbumComponent } from './components/album/album.component';
import { ResourceComponent } from './components/resource/resource.component';
import { NewsComponent } from './components/news/news.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { SermonListComponent } from './components/sermon/sermon-list/sermon-list.component';
import { PraiseRecordingListComponent } from './components/praise-recording/praise-recording-list/praise-recording-list.component';
import { YoungAdultsColumnListComponent } from './components/young-adults-column/young-adults-column-list/young-adults-column-list.component';
import { SermonCreatePostComponent } from './components/sermon/sermon-create-post/sermon-create-post.component';
import { SermonEditPostComponent } from './components/sermon/sermon-edit-post/sermon-edit-post.component';
import { PraiseRecordingCreatePostComponent } from './components/praise-recording/praise-recording-create-post/praise-recording-create-post.component';
import { PraiseRecordingEditPostComponent } from './components/praise-recording/praise-recording-edit-post/praise-recording-edit-post.component';
import { YoungAdultsColumnCreatePostComponent } from './components/young-adults-column/young-adults-column-create-post/young-adults-column-create-post.component';
import { YoungAdultsColumnEditPostComponent } from './components/young-adults-column/young-adults-column-edit-post/young-adults-column-edit-post.component';
import { YoungAdultsColumnViewPostComponent } from './components/young-adults-column/young-adults-column-view-post/young-adults-column-view-post.component';
import { PraiseRecordingViewPostComponent } from './components/praise-recording/praise-recording-view-post/praise-recording-view-post.component';
import { SermonViewPostComponent } from './components/sermon/sermon-view-post/sermon-view-post.component';
import { PictureListComponent } from './components/picture/picture-list/picture-list.component';
import { PictureCreatePostComponent } from './components/picture/picture-create-post/picture-create-post.component';
import { PictureEditPostComponent } from './components/picture/picture-edit-post/picture-edit-post.component';
import { PictureViewPostComponent } from './components/picture/picture-view-post/picture-view-post.component';
import { VideoListComponent } from './components/video/video-list/video-list.component';
import { VideoCreatePostComponent } from './components/video/video-create-post/video-create-post.component';
import { VideoEditPostComponent } from './components/video/video-edit-post/video-edit-post.component';
import { VideoViewPostComponent } from './components/video/video-view-post/video-view-post.component';
import { WorshipBannerComponent } from './components/worship-banner/worship-banner.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';

//Services
import {SermonService} from './components/sermon/service/sermon.service';

const appRoutes:Routes = [
  {path:"",component: LandingPageComponent},
  {path:"about-us",component: AboutUsComponent},
  {path:"SermonListComponent",component: SermonListComponent},
  {path:"PraiseRecordingListComponent",component: PraiseRecordingListComponent},
  {path:"YoungAdultsColumnListComponent",component: YoungAdultsColumnListComponent},
  {path:"PictureListComponent",component: PictureListComponent},
  {path:"VideoListComponent",component: VideoListComponent},
  {path: "SermonViewPostComponent/:id", component: SermonViewPostComponent},
  {path: "SermonCreatePostComponent",component:SermonCreatePostComponent},
  {path: "ComingsoonComponent", component:ComingsoonComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GnbComponent,
    BannerComponent,
    Front1Component,
    Front2Component,
    Front3Component,
    FooterComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    AboutUsComponent,
    WorshipServiceComponent,
    AlbumComponent,
    ResourceComponent,
    NewsComponent,
    LandingPageComponent,
    DashboardComponent,
    GoogleMapsComponent,
    SermonListComponent,
    PraiseRecordingListComponent,
    YoungAdultsColumnListComponent,
    SermonCreatePostComponent,
    SermonEditPostComponent,
    PraiseRecordingCreatePostComponent,
    PraiseRecordingEditPostComponent,
    YoungAdultsColumnCreatePostComponent,
    YoungAdultsColumnEditPostComponent,
    YoungAdultsColumnViewPostComponent,
    PraiseRecordingViewPostComponent,
    SermonViewPostComponent,
    PictureListComponent,
    PictureCreatePostComponent,
    PictureEditPostComponent,
    PictureViewPostComponent,
    VideoListComponent,
    VideoCreatePostComponent,
    VideoEditPostComponent,
    VideoViewPostComponent,
    WorshipBannerComponent,
    ContactUsComponent,
    ComingsoonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD72lQaX_Ki1nZlA9Y2OoczB8GvKBY_hIg'
    })
  ],
  providers: [
    SermonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

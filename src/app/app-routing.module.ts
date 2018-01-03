import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

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
import { RegisterComponent } from './components/login/register/register.component';
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

//Guards
import { AuthGuard } from './components/guards/auth.guard';
import { GnbStatusGuard } from './components/guards/gnb-status.guard';

const appRoutes:Routes = [
  {path:"",component: LandingPageComponent, canActivate:[GnbStatusGuard]},
  {path:"about-us",component: AboutUsComponent, canActivate:[GnbStatusGuard]},
  {path:"SermonListComponent",component: SermonListComponent, canActivate:[AuthGuard]},
  {path:"SermonCreatePostComponent",component:SermonCreatePostComponent, canActivate:[AuthGuard]},
  {path:"SermonViewPostComponent/:id", component: SermonViewPostComponent, canActivate:[AuthGuard]},
  {path:"SermonEditPostComponent/:id", component: SermonEditPostComponent, canActivate:[AuthGuard]},
  {path:"PraiseRecordingListComponent",component: PraiseRecordingListComponent, canActivate:[AuthGuard]},
  {path:"PraiseRecordingCreatePostComponent",component:PraiseRecordingCreatePostComponent, canActivate:[AuthGuard]},
  {path:"PraiseRecordingViewPostComponent/:id", component: PraiseRecordingViewPostComponent, canActivate:[AuthGuard]},
  {path:"PraiseRecordingEditPostComponent/:id", component: PraiseRecordingEditPostComponent, canActivate:[AuthGuard]},
  {path:"YoungAdultsColumnListComponent",component: YoungAdultsColumnListComponent, canActivate:[AuthGuard]},
  {path:"YoungAdultsColumnCreatePostComponent",component: YoungAdultsColumnCreatePostComponent, canActivate:[AuthGuard]},
  {path:"YoungAdultsColumnViewPostComponent/:id",component: YoungAdultsColumnViewPostComponent, canActivate:[AuthGuard]},
  {path:"YoungAdultsColumnEditPostComponent/:id",component: YoungAdultsColumnEditPostComponent, canActivate:[AuthGuard]},
  {path:"PictureListComponent",component: PictureListComponent, canActivate:[GnbStatusGuard]},
  {path:"PictureCreatePostComponent",component: PictureCreatePostComponent, canActivate:[AuthGuard]},
  {path:"PictureViewPostComponent/:id",component: PictureViewPostComponent, canActivate:[AuthGuard]},
  {path:"PictureEditPostComponent/:id",component: PictureEditPostComponent, canActivate:[AuthGuard]},
  {path:"VideoListComponent",component: VideoListComponent, canActivate:[GnbStatusGuard]},
  {path:"ComingsoonComponent", component:ComingsoonComponent, canActivate:[GnbStatusGuard]},
  {path:"LoginComponent", component:LoginComponent, canActivate:[GnbStatusGuard]},
  {path:"RegisterComponent",component:RegisterComponent, canActivate:[GnbStatusGuard]}
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule{}

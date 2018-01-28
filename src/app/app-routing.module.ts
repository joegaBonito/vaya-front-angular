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
import { WorshipBannerComponent } from './components/worship-banner/worship-banner.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';
import { NewsEditComponent } from './components/news/news-edit/news-edit.component';

//Guards
import { AuthGuard } from './components/guards/auth.guard';
import { GnbStatusGuard } from './components/guards/gnb-status.guard';

const appRoutes:Routes = [
  {path:"",component: LandingPageComponent, canActivate:[GnbStatusGuard]},
  {path:"about-us",component: AboutUsComponent, canActivate:[GnbStatusGuard]},
  {path:"ComingsoonComponent", component:ComingsoonComponent, canActivate:[GnbStatusGuard]},
  {path:"LoginComponent", component:LoginComponent, canActivate:[GnbStatusGuard]},
  {path:"RegisterComponent",component:RegisterComponent, canActivate:[GnbStatusGuard]},
  {path:"sermon", loadChildren:'./components/sermon/sermon.module#SermonModule'},
  {path:"praise-recording", loadChildren:'./components/praise-recording/praise-recording.module#PraiseRecordingModule'},
  {path:"yacolumn", loadChildren:'./components/young-adults-column/yacolumn.module#YAColumnModule'},
  {path:"picture", loadChildren:'./components/picture/picture.module#PictureModule'}
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

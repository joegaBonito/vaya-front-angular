//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { AgmCoreModule} from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { SermonModule } from './components/sermon/sermon.module';
import { YAColumnModule } from './components/young-adults-column/yacolumn.module';
import { PraiseRecordingModule} from './components/praise-recording/praise-recording.module';
import { PictureModule } from './components/picture/picture.module';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

//Components
import { AppComponent } from './app.component';
import { GnbComponent } from './components/gnb/gnb.component';
import { Front1Component } from './components/front1/front1.component';
import { Front3Component } from './components/front3/front3.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/login/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { WorshipServiceComponent } from './components/worship-service/worship-service.component';
import { NewsComponent } from './components/news/news.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { WorshipBannerComponent } from './components/worship-banner/worship-banner.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ComingsoonComponent } from './components/comingsoon/comingsoon.component';
import { NewsEditComponent } from './components/news/news-edit/news-edit.component';
import { ProfileEditComponent } from './components/login/profile/profile-edit-component';

//Services
import {SermonService} from './components/sermon/service/sermon.service';
import {PraiserecordingService} from './components/praise-recording/service/praiserecording.service';
import {YacolumnService } from './components/young-adults-column/service/yacolumn.service'
import {LoginService} from './components/login/service/login.service';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {PictureService } from './components/picture/service/picture.service';
import {NewsService} from './components/news/service/news.service';
import {LandingPageService} from './components/landing-page/service/landing-page.service';
import {ContactUsService} from './components/contact-us/service/contact-us.service';
import {GnbService} from './components/gnb/service/gnb.service';
import {MemberService} from './components/member/service/member.service';

//Guards
import { AuthGuard } from './components/guards/auth.guard';
import { SelfCheckGuard } from './components/guards/self-check.guard';

//npm libraries
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgProgressModule } from 'ngx-progressbar';

//ngrx
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/app.reducer';
import { AuthEffects } from './components/login/store/auth.effect';
import * as fromAuth from '../app/components/login/store/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    GnbComponent,
    Front1Component,
    Front3Component,
    FooterComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    AboutUsComponent,
    WorshipServiceComponent,
    NewsComponent,
    LandingPageComponent,
    GoogleMapsComponent,
    WorshipBannerComponent,
    ContactUsComponent,
    ComingsoonComponent,
    NewsEditComponent,
    ProfileEditComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'VAYA-SSR' }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    AppRoutingModule,
    PraiseRecordingModule,
    YAColumnModule,
    PictureModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    FlashMessagesModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD72lQaX_Ki1nZlA9Y2OoczB8GvKBY_hIg'
    }),
    NgxGalleryModule,
    NgProgressModule
  ],
  providers: [
    HttpClientModule,
    SermonService,
    PraiserecordingService,
    YacolumnService,
    LoginService,
    AuthGuard,
    PictureService,
    NewsService,
    LandingPageService,
    ContactUsService,
    GnbService,
    MemberService,
    SelfCheckGuard,
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'on the server' : 'in the browser';
    //console.log(`Running ${platform} with appId=${appId}`);
  }
}

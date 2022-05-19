import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountUpModule } from 'ngx-countup';
import { TabsModule } from 'ngx-tabset';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { StickyNavModule } from 'ng2-sticky-nav';
import { LightboxModule } from 'ngx-lightbox';
import { FormsModule } from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from 'src/services/login.service';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxStarRatingModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    CountUpModule,
    TabsModule,
    NgxScrollTopModule,
    StickyNavModule,
    LightboxModule,
    FormsModule,WebcamModule,HttpClientModule 
  ],
  providers: [LoginService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

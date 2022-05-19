import { NgModule } from '@angular/core';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module'; 
import { CommonModule } from '@angular/common';
import {SettingsComponent} from './settings.component'
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';  
import {WebcamModule} from 'ngx-webcam';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';





@NgModule({
    imports:[SettingsRoutingModule,FormsModule,ReactiveFormsModule,NgxScrollTopModule,CommonModule,WebcamModule],
    declarations: [ SettingsComponent,ProfilePageComponent, ProfilePictureComponent, AccountSecurityComponent, NotificationSettingsComponent
  ]
        
})

export class SettingsModule {}
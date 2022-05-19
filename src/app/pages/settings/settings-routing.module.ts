import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from './settings.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';  
import { AccountSecurityComponent } from './account-security/account-security.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';

const routes: Routes = [
    {path: '', component : SettingsComponent},
    {path: 'profile', component : ProfilePageComponent},
    {path: 'profile-picture', component : ProfilePictureComponent},
    {path: 'account-security', component : AccountSecurityComponent},
    {path: 'notification-settings', component : NotificationSettingsComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class SettingsRoutingModule { } 
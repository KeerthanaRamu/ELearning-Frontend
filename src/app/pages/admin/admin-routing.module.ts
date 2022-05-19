import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

// import { ProfilePageComponent } from './profile-page/profile-page.component';
// import { ProfilePictureComponent } from './profile-picture/profile-picture.component';  
// import { AccountSecurityComponent } from './account-security/account-security.component';
// import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'create-course', component: CreateCourseComponent },
  { path: 'category', component: CreateCategoryComponent },
  { path: 'sub-category', component: CreateSubcategoryComponent },
  // {path: 'profile-picture', component : ProfilePictureComponent},
  // {path: 'account-security', component : AccountSecurityComponent},
  // {path: 'notification-settings', component : NotificationSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
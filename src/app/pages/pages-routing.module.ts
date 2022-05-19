import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageOneComponent } from './home-page-one/home-page-one.component';

import { AuthGuard } from '../guards/auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { MyWhishlistComponent } from './my-whishlist/my-whishlist.component';
import { InstructorDetailsComponent } from './instructor-details/instructor-details.component';
import { CoursesListSubcategoryComponent } from './courses-list-subcategory/courses-list-subcategory.component';
import { MyLearningsListComponent } from './my-learnings-list/my-learnings-list.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: '', component: HomePageOneComponent },
  { path: 'sign-up', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'my-learnings', loadChildren: () => import(`./my-learnings/my-learnings.module`).then(
      module => module.MyLearningsModule
    )
  },
  {
    path: 'instructor', loadChildren: () => import(`./instructor/instructor.module`).then(
      module => module.InstructorModule
    )
  },
  {
    path: 'settings', loadChildren: () => import(`./settings/settings.module`).then(
      module => module.SettingsModule
    )
  },
  {
    path: 'admin', loadChildren: () => import(`./admin/admin.module`).then(
      module => module.AdminModule
    )
  },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'my-learnings-list', component: MyLearningsListComponent },
  { path: 'my-wishlist', component: MyWhishlistComponent },
  { path: 'courses-list', component: CoursesListComponent },
  { path: 'courses-list-sub', component: CoursesListSubcategoryComponent },
  { path: 'courses-details', component: CourseDetailsComponent },
  { path: 'instructor-details', component: InstructorDetailsComponent },
  { path: 'messages', component: MessagesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule { }
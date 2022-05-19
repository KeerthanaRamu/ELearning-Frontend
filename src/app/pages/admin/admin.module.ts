import { NgModule } from '@angular/core';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component'
import { WebcamModule } from 'ngx-webcam';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { NgxStarsModule } from 'ngx-stars';



@NgModule({
  imports: [NgxStarsModule,CarouselModule,NgxPaginationModule,NgxSpinnerModule,AdminRoutingModule, FormsModule, ReactiveFormsModule, NgxScrollTopModule, CommonModule, WebcamModule],
  declarations: [AdminComponent, AdminDashboardComponent, CreateCourseComponent, CreateCategoryComponent, CreateSubcategoryComponent]

})

export class AdminModule { }
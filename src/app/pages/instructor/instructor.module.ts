import { NgModule } from '@angular/core';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstructorRoutingModule } from './instructor-routing.module';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxSpinnerModule } from "ngx-spinner";
import { CarouselModule } from 'ngx-owl-carousel-o';


import { InstructorComponent } from './instructor.component';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorStudentsComponent } from './instructor-students/instructor-students.component';
import { InstructorReviewsComponent } from './instructor-reviews/instructor-reviews.component';
import { InstructorCommunicationComponent } from './instructor-communication/instructor-communication.component';
import { NgxStarsModule } from 'ngx-stars';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
    imports: [CarouselModule,NgxSpinnerModule,NgxStarsModule,AutocompleteLibModule,NgxStarRatingModule,NgxPaginationModule, InstructorRoutingModule, FormsModule, ReactiveFormsModule, NgxScrollTopModule, CommonModule],
    declarations: [InstructorComponent, InstructorCourseComponent, InstructorDashboardComponent, InstructorStudentsComponent, InstructorReviewsComponent, InstructorCommunicationComponent
    ]

})

export class InstructorModule { }
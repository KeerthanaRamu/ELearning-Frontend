import { NgModule } from '@angular/core';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyLearningsRoutingModule } from './my-learnings-routing.module';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxStarsModule } from 'ngx-stars';


import { MyLearningsComponent } from './my-learnings.component';
import { MyLearningsOverviewComponent } from './my-learnings-overview/my-learnings-overview.component';
// import { InstructorCourseComponent } from './instructor-course/instructor-course.component';
// import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
// import { InstructorStudentsComponent } from './instructor-students/instructor-students.component';
// import { InstructorReviewsComponent } from './instructor-reviews/instructor-reviews.component';


@NgModule({
    imports: [NgxStarsModule,NgxStarRatingModule,NgxPaginationModule, MyLearningsRoutingModule, FormsModule, ReactiveFormsModule, NgxScrollTopModule, CommonModule],
    declarations: [MyLearningsComponent, MyLearningsOverviewComponent
    ]

})

export class MyLearningsModule { }
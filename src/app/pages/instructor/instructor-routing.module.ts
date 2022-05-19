import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorCourseComponent } from './instructor-course/instructor-course.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorStudentsComponent } from './instructor-students/instructor-students.component';
import { InstructorReviewsComponent } from './instructor-reviews/instructor-reviews.component';
import { InstructorCommunicationComponent } from './instructor-communication/instructor-communication.component';

const routes: Routes = [
    {path: '', component : InstructorComponent},
    {path: 'courses', component : InstructorCourseComponent},
    {path: 'dashboard', component : InstructorDashboardComponent},
    {path: 'students', component : InstructorStudentsComponent},
    {path: 'reviews', component : InstructorReviewsComponent},
    {path: 'communication', component : InstructorCommunicationComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class InstructorRoutingModule { } 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyLearningsComponent } from './my-learnings.component';
import { MyLearningsOverviewComponent } from './my-learnings-overview/my-learnings-overview.component';
// import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
// import { InstructorStudentsComponent } from './instructor-students/instructor-students.component';
// import { InstructorReviewsComponent } from './instructor-reviews/instructor-reviews.component';

const routes: Routes = [
    {path: '', component : MyLearningsComponent},
    {path: 'overview', component : MyLearningsOverviewComponent},
    // {path: 'dashboard', component : InstructorDashboardComponent},
    // {path: 'students', component : InstructorStudentsComponent},
    // {path: 'reviews', component : InstructorReviewsComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class MyLearningsRoutingModule { } 
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../../../services/auth.service'; 
import { InstructorService } from '../../../../services/instructor.service'; 

@Component({
  selector: 'app-instructor-students',
  templateUrl: './instructor-students.component.html',
  styleUrls: ['./instructor-students.component.scss']
})
export class InstructorStudentsComponent implements OnInit {

  studentList;
  page = 1;
  count = 0;
  tableSize = 5;
  pageInfo={};
  viewPage=1;
  viewCount=0;
  viewtableSize = 5;
  viewpageInfo={};
  enrollViewDetails: any[];
  currentEnrollInfo: any;
  constructor(private authService:AuthService,private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private instructorService: InstructorService) { }

  ngOnInit(): void {
    this.page=1;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.getStudentListPerInstructor(this.pageInfo);
    this.authService.isStateChanged.next(3);
  }

  getStudentListPerInstructor(pageInfo) {
    this.instructorService.getStudentListPerInstructor(sessionStorage.authToken,pageInfo)
      .subscribe(res => {
        this.studentList = res;
       
      })
  }

  onTableDataChange(event){
    this.page = event;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.getStudentListPerInstructor(this.pageInfo);
  }

  viewCoursesForEnroll(enrolldt){
    this.viewPage=1;
    this.enrollViewDetails=[];
    this.currentEnrollInfo=enrolldt;
    this.viewpageInfo['viewPage']=this.page-1;
    this.viewpageInfo['tableSize']=this.viewtableSize;
    this.instructorService.getCoursesViewForEnroll(enrolldt,this.viewpageInfo)
    .subscribe(res=>{
      this.enrollViewDetails=res['enrollViewInfo'];
      this.viewCount=res['enrollViewCount'];
    })
  } 

  onTableDataChangeEnrollView(event){
    this.viewPage = event;
    this.viewpageInfo['viewPage']=this.page-1;
    this.viewpageInfo['tableSize']=this.viewtableSize;
    this.instructorService.getCoursesViewForEnroll(this.currentEnrollInfo,this.viewpageInfo)
    .subscribe(res=>{
      this.enrollViewDetails=res['enrollViewInfo'];
      this.viewCount=res['enrollViewCount'];
    })
  }

}

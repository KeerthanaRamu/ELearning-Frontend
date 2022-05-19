import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { InstructorService } from 'src/services/instructor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service'
import { NgxSpinnerService } from "ngx-spinner";
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  	totalCourse: any;
	totalInstructor: any;
	totalStudent: any;
	page = 1;
	count = 0;
	tableSize = 5;
	viewPage=1;
	viewtableSize=5;
	viewcount=0;
	viewpageInfo={}
	pageInfo={};
	showCourses=false;
	courseDetails: any;
	currentCourseView: any;
	studentViewDetails: any;
	InstructorViewDetails: any;
	currentInsView: any;
	showInstructor=false;
	instructorDetails: any;
	showStudent=false;
	StudentDetails: any;
	

  constructor(private spinner: NgxSpinnerService,private authService: AuthService,private formBuilder:FormBuilder,private instructorService:InstructorService,private router:Router,private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.authService.isStateChanged.next(1);
	this.getAdminDashboardCount();
  }

  categoriesSlides: OwlOptions = {
		loop: false,
		nav: false,
		dots: false,
		autoplayHoverPause: false,
		autoplay: false,
		margin: 30,
		navText: [
			"<i class='bx bx-left-arrow-alt'></i>",
			"<i class='bx bx-right-arrow-alt'></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	}

  getAdminDashboardCount(){
    this.instructorService.getAdminDashboardCount()
	.subscribe(res=>{
		this.totalCourse=res['courseCount'][0].totalCourse;
		this.totalInstructor=res['insCount'][0].totalInstructor;
		this.totalStudent=res['studCount'][0].totalStudent;
	})
  }

  getCousesDetails(){
	  this.page=1;
	  this.pageInfo['page']=this.page-1;
	  this.pageInfo['tableSize']=this.tableSize;
	  this.showCourses=true;
	  this.showInstructor=false;
	  this.showStudent=false;
	this.instructorService.getCousesDetails(this.pageInfo)
	.subscribe(res=>{
		this.courseDetails=res['data'];
		this.count=res['courseCount'];
		console.log("this.courseDetails====",this.courseDetails);
	// this.totalCourse=res['courseCount'][0].totalCourse;
	// this.totalInstructor=res['insCount'][0].totalInstructor;
	// this.totalStudent=res['studCount'][0].totalStudent;
	})
  }

  onTableDataChangeCourses(event){
	this.page = event;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.instructorService.getCousesDetails(this.pageInfo)
	.subscribe(res=>{
		this.courseDetails=res['data'];
		this.count=res['courseCount'];
    })
  }

  getInstructorDetail(coursedt){
	this.InstructorViewDetails=[];
	this.currentInsView=coursedt;
	this.instructorService.getInstructorViewForAdmin(coursedt)
	.subscribe(res=>{
		console.log("res['insInfo']===",res['insInfo']);
	this.InstructorViewDetails=res['insInfo'][0];
	})
  }


  getStudentDetail(coursedt){
		this.studentViewDetails=[];
		this.viewPage=1;
		this.currentCourseView=coursedt;
		this.viewpageInfo['viewPage']=this.viewPage-1;
		this.viewpageInfo['tableSize']=this.viewtableSize;
    this.instructorService.getStudentsViewForRevenue(coursedt,this.viewpageInfo)
    .subscribe(res=>{
		console.log("res['revenueViewCount']===",res['revenueViewCount']);
      this.studentViewDetails=res['revenueViewInfo'];
      this.viewcount=res['revenueViewCount'];
	  console.log("this.viewcount====",this.viewcount);
    })
 }

 onTableDataChangeStudentView(event){
	this.page = event;
	this.viewPage=1;
	this.viewpageInfo['viewPage']=this.page-1;
	this.viewpageInfo['tableSize']=this.viewtableSize;
    this.instructorService.getStudentsViewForRevenue(this.currentCourseView,this.viewpageInfo)
    .subscribe(res=>{
      this.studentViewDetails=res['revenueViewInfo'];
      this.viewcount=res['revenueViewCount'];
    })
 }

 getInstructorDetails(){
	 this.showInstructor=true;
	 this.showCourses=false;
	 this.showStudent=false;
	 this.page=1;
	 this.pageInfo['page']=this.page-1;
	 this.pageInfo['tableSize']=this.tableSize;
	 this.instructorService.getOverallInstructorList(this.pageInfo)
    .subscribe(res=>{
      this.instructorDetails=res['insInfo'];
      this.count=res['insCount'];
    })
 }

 onTableDataChangeInstructor(event){
	this.page = event;
	this.pageInfo['page']=this.page-1;
	this.pageInfo['tableSize']=this.tableSize;
	this.instructorService.getOverallInstructorList(this.pageInfo)
   .subscribe(res=>{
	 this.instructorDetails=res['insInfo'];
	 this.count=res['insCount'];
   })
 }

 getStudentDetails(){
	this.showInstructor=false;
	this.showCourses=false;
	this.showStudent=true;
	this.page=1;
	this.pageInfo['page']=this.page-1;
	this.pageInfo['tableSize']=this.tableSize;
	this.instructorService.getOverallStudentList(this.pageInfo)
   .subscribe(res=>{
	 this.StudentDetails=res['studInfo'];
	 this.count=res['studCount'];
   })
 }

 onTableDataChangeStudent(event){
	this.page = event;
	this.pageInfo['page']=this.page-1;
	this.pageInfo['tableSize']=this.tableSize;
	this.instructorService.getOverallStudentList(this.pageInfo)
   .subscribe(res=>{
	 this.StudentDetails=res['studInfo'];
	 this.count=res['studCount'];
   })
 }

}

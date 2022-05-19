import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InstructorService } from 'src/services/instructor.service';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.scss']
})
export class InstructorDashboardComponent implements OnInit {
  totalRevenue: any;
  totalEnroll: any;
  totalRating: any;
  monthRevenue: any;
  monthEnroll: any;
  monthRating: any;
  page = 1;
  count = 0;
  tableSize = 5;
  viewPage=1;
  viewCount=0;
  viewtableSize = 5;
  viewpageInfo={};
  pageInfo={};
  showRevenue:boolean=false;
  showEnrollment:boolean=false;
  showRating:boolean=false;
  revenueDetails: any;
  currentCourseRevenue: any;
  revenueViewDetails: any;
  enrollDetails: any;
  currentEnrollInfo: any;
  enrollViewDetails: any;
  ratingDetails: any;
  ratingViewDetails: any[];
  currentRatingInfo: any;
	constructor(private authService:AuthService,private instructorService: InstructorService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isStateChanged.next(1);
    this.getUserDashboardCount();
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

  


  getUserDashboardCount(){
    var date = new Date();
    var dateObj={};
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    console.log("firstDay====",firstDay,lastDay);
    dateObj['fromDate']=firstDay;
    dateObj['toDate']=lastDay;
    this.instructorService.getUserDashboardCount(sessionStorage.authToken,dateObj)
    .subscribe(res=>{
        this.totalRevenue=res['revenueData'][0]['totalRevenue'];
        this.totalEnroll=res['enrollData'][0]['totalEnroll'];
        this.totalRating=res['ratingData'][0]['averageRating'].toFixed(1);
        this.monthRevenue=res['monthrevenueData'][0]['monthRevenue'];
        this.monthEnroll=res['monthenrollData'][0]['monthEnroll'];
        this.monthRating=res['monthratingData'][0]['averageRating'].toFixed(1);
    })
  }

  // ---------------------------Revenuee------------------------------------------

  getUserRevenueDetails(){
    this.showRevenue=true;
    this.showEnrollment=false;
    this.showRating=false;
    this.page=1;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.instructorService.getUserRevenueDetails(sessionStorage.authToken,this.pageInfo)
    .subscribe(res=>{
      this.revenueDetails=res['revenueInfo'];
      this.count=res['revenueCount'];
    })
  }

  onTableDataChangeRevenue(event) {
    this.page = event;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.instructorService.getUserRevenueDetails(sessionStorage.authToken,this.pageInfo)
    .subscribe(res=>{
        this.revenueDetails=res['revenueInfo'];
        this.count=res['revenueCount'];
    })
  }

  viewStudentsForRevenue(revenuedt){
    this.revenueViewDetails=[];
    this.viewPage=1;
    this.currentCourseRevenue=revenuedt;
    this.viewpageInfo['viewPage']=this.viewPage-1;
    this.viewpageInfo['tableSize']=this.viewtableSize;
    this.instructorService.getStudentsViewForRevenue(revenuedt,this.viewpageInfo)
    .subscribe(res=>{
      this.revenueViewDetails=res['revenueViewInfo'];
      this.viewCount=res['revenueViewCount'];
    })
  }

  onTableDataChangeRevenueView(event) {
    this.viewPage = event;
    this.viewpageInfo['viewPage']=this.viewPage-1;
    this.viewpageInfo['tableSize']=this.viewtableSize;
    this.instructorService.getStudentsViewForRevenue(this.currentCourseRevenue,this.viewpageInfo)
    .subscribe(res=>{
      this.revenueViewDetails=res['revenueViewInfo'];
      this.viewCount=res['revenueViewCount'];
    })
  }

  // ---------------------------Enrollment-----------------------

  getUserEnrollmentDetails(){
    this.showRevenue=false;
    this.showEnrollment=true;
    this.showRating=false;
    this.page=1;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.instructorService.getUserEnrollmentDetails(sessionStorage.authToken,this.pageInfo)
    .subscribe(res=>{
      this.enrollDetails=res['enrollInfo'];
      this.count=res['enrollCount'];
    })
  }

  onTableDataChangeEnroll(event){
    this.page = event;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.instructorService.getUserEnrollmentDetails(sessionStorage.authToken,this.pageInfo)
    .subscribe(res=>{
      this.enrollDetails=res['enrollInfo'];
      this.count=res['enrollCount'];
    })
  }

  viewCoursesForEnroll(enrolldt){
    this.viewPage=1;
    this.enrollViewDetails=[];
    this.currentEnrollInfo=enrolldt;
    this.viewpageInfo['viewPage']=this.viewPage-1;
    this.viewpageInfo['tableSize']=this.viewtableSize;
    this.instructorService.getCoursesViewForEnroll(enrolldt,this.viewpageInfo)
    .subscribe(res=>{
      this.enrollViewDetails=res['enrollViewInfo'];
      this.viewCount=res['enrollViewCount'];
    })
  }

  onTableDataChangeEnrollView(event){
    this.viewPage = event;
    this.viewpageInfo['viewPage']=this.viewPage-1;
    this.viewpageInfo['tableSize']=this.viewtableSize;
    this.instructorService.getCoursesViewForEnroll(this.currentEnrollInfo,this.viewpageInfo)
    .subscribe(res=>{
      this.enrollViewDetails=res['enrollViewInfo'];
      this.viewCount=res['enrollViewCount'];
    })
  }

  // --------------------------------Rating----------------------------------------

  getUserRatingDetails(){
    this.showRevenue=false;
    this.showEnrollment=false;
    this.showRating=true;
    this.page=1;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.instructorService.getUserRatingDetails(sessionStorage.authToken,this.pageInfo)
    .subscribe(res=>{
      this.ratingDetails=res['ratingInfo'];
      for(let i=0;i<this.ratingDetails.length;i++){
        this.ratingDetails[i].averageRating=  (this.ratingDetails[i].averageRating).toFixed(1);
      }
      this.count=res['ratingCount'];
    })
  }

  onTableDataChangeRating(event){
    this.page = event;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.instructorService.getUserRatingDetails(sessionStorage.authToken,this.pageInfo)
    .subscribe(res=>{
      this.ratingDetails=res['ratingInfo'];
      for(let i=0;i<this.ratingDetails.length;i++){
        this.ratingDetails[i].averageRating=  (this.ratingDetails[i].averageRating).toFixed(1);
      }
      this.count=res['ratingCount'];
    })
  }


  viewCoursesForRating(ratdt){
      this.viewPage=1;
      this.ratingViewDetails=[];
      this.currentRatingInfo=ratdt;
      this.viewpageInfo['viewPage']=this.viewPage-1;
      this.viewpageInfo['tableSize']=this.viewtableSize;
      this.instructorService.getCoursesViewForRating(ratdt,this.viewpageInfo)
      .subscribe(res=>{
        this.ratingViewDetails=res['ratingViewInfo'];
        for(let i=0;i<this.ratingViewDetails.length;i++){
          this.ratingViewDetails[i].rating=  (this.ratingViewDetails[i].rating).toFixed(1);
        }
        this.viewCount=res['ratingViewCount'];
      })
  }

  onTableDataChangeRatingView(event){
    this.viewPage = event;
    this.viewpageInfo['viewPage']=this.viewPage-1;
    this.viewpageInfo['tableSize']=this.viewtableSize;
    this.instructorService.getCoursesViewForRating(this.currentRatingInfo,this.viewpageInfo)
    .subscribe(res=>{
      this.ratingViewDetails=res['ratingViewInfo'];
      for(let i=0;i<this.ratingViewDetails.length;i++){
        this.ratingViewDetails[i].rating=  (this.ratingViewDetails[i].rating).toFixed(1);
      }
      this.viewCount=res['ratingViewCount'];
    })
  }

}

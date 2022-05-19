import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InstructorService } from '../../../services/instructor.service'
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseInfo: any;
  courseId: any;
  courseObjective: any;
  courseRequirement: any;
  courseFor: any;
  courseSections;
  instructorInfo: any;
  reviewInfo: Object;
  ratingForm: FormGroup;
  resObj;
  cartObj;
  cartTitle;
  constructor(private authService:AuthService,private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private instructorService: InstructorService) { }

  ngOnInit(): void {

    this.ratingForm = this.formBuilder.group({
      rating: [''],
    })


    this.route.queryParams.subscribe(params => {
      this.courseId = JSON.parse(params["coursedt"]);
      console.log("this.courseInfo==", this.courseId);
      this.instructorService.getCourseDetailedView(this.courseId)
        .subscribe(res => {
          console.log("detailed-----view=======",res);
          var resObj=res['courseInfo'][0]
          if(resObj.ratingCount > 1){
            resObj['averageRating']= (resObj.ratingSum/resObj.ratingCount).toFixed(1);
          }else{
            resObj['averageRating'] = (resObj.ratingSum/1).toFixed(1);
          }
          this.courseInfo = resObj;
          this.courseObjective = res['courseObjective'];
          this.courseRequirement = res['courseReq'];
          this.courseFor = res['courseFor'];
          this.instructorInfo = res['instructorInfo'][0];
          console.log(res);
          this.instructorService.getSectionByCourse(this.courseId)
            .subscribe(res => {
              console.log("section--info==", res);
              this.courseSections = res['data'];
              this.getRatingReviewPerCourse();
              this.checkCartInfo();
            })
        })
      // console.log(this.categoryInfo);

      // this.getCoursesList();
    })
  }

  checkCartInfo() {
    this.instructorService.checkCartInfo(sessionStorage.authToken, this.courseId)
      .subscribe(res => {
        this.cartObj = res;
        console.log("this.cartObj===", this.cartObj)
        if (this.cartObj.length > 0) {
          if (this.cartObj[0].cart_status == 'Removed') {
            this.cartTitle = 'Add To Cart'
          } else if (this.cartObj[0].cart_status == 'Open') {
            this.cartTitle = 'Go To Cart'
          } else {
            this.cartTitle = ''
          }
        } else {
          this.cartTitle = 'Add To Cart'
        }
      })
  }

  getRatingReviewPerCourse() {
    this.instructorService.getRatingReviewPerCourse(this.courseId)
      .subscribe(res => {
        this.resObj = res;
        this.reviewInfo = this.resObj;
        for (let i = 0; i < this.resObj.length; i++) {
          this.ratingForm.patchValue({
            rating: this.resObj[i].rating
          })
        }
      })
  }

  addToCart(coursedt) {
    console.log("coursedt=====", coursedt);
    if (sessionStorage.authToken) {
      if (coursedt.funcName == "Go to Cart") {
        this.router.navigate(['/cart']);
      } else {
        this.instructorService.setAddToCartDetails(sessionStorage.authToken, coursedt)
          .subscribe(res => {
            this.authService.isUserLoggedIn.next(true);
            this.router.navigate(['/cart']);
          })
      }

    } else {
      alert("Please Login to Continue!!!");
      // this.toastrService.error('Please Login to Continue!!!.');
    }

  }

  getAuthorInfo(tutor) {
    let navigationExtras: NavigationExtras = {
      // skipLocationChange: true,
      queryParams: {
        "tutor": JSON.stringify(tutor.id),
      }
    }
    this.router.navigate(['/instructor-details'], navigationExtras);
  }

}

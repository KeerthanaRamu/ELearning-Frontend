import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/services/instructor.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home-page-one',
  templateUrl: './home-page-one.component.html',
  styleUrls: ['./home-page-one.component.scss']
})
export class HomePageOneComponent implements OnInit {

  coursesList;
  categoryList;
  userCartInfo;
  resObj;
  constructor(private authService:AuthService,private toastrService: ToastrService, private instructorService: InstructorService, private router: Router) { }



  ngOnInit(): void {
    this.instructorService.getCoursesList(sessionStorage.authToken)
      .subscribe(res => {
        this.resObj = res['courseInfo'];
        console.log("this.resObj=====", this.resObj);
        this.coursesList = this.resObj;
      })


    this.instructorService.getCategoryList()
      .subscribe(res => {
        this.categoryList = res;
      })

  }

  coursesSlides: OwlOptions = {
    loop: false,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
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
        items: 4
      },
      1200: {
        items: 5
      }
    }
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

  setWishlist(coursedt) {
    coursedt.wishStatus = !coursedt.wishStatus;
    coursedt.wishliStatus = (coursedt.wishStatus == true ? 1 : 0);
    console.log("coursedt==", coursedt);
    this.instructorService.setWishlist(sessionStorage.authToken, coursedt)
      .subscribe(res => {
        this.authService.isUserLoggedIn.next(true);
        this.toastrService.success('updated Successfully');
      })
  }


  goToDetailedPage(coursedt) {
    console.log("coursedt===", coursedt);
    let navigationExtras: NavigationExtras = {
      // skipLocationChange: true,
      queryParams: {
        "coursedt": JSON.stringify(coursedt.id),
      }
    }
    this.router.navigate(['/courses-details'], navigationExtras);
  }

}

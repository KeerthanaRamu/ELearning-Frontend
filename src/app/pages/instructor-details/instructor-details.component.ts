import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InstructorService } from '../../../services/instructor.service'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-instructor-details',
  templateUrl: './instructor-details.component.html',
  styleUrls: ['./instructor-details.component.scss']
})
export class InstructorDetailsComponent implements OnInit {

  tutorId;
  userInfo;
  courseInfo;
  studentCount: any;
  reviewCount: any;
  constructor(private spinner: NgxSpinnerService,private router: Router, private route: ActivatedRoute, private instructorService: InstructorService) { }

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

  ngOnInit(): void {
    this.spinner.show();
    this.route.queryParams.subscribe(params => {
      this.tutorId = JSON.parse(params["tutor"]);
      this.instructorService.getTutorDetails(this.tutorId)
        .subscribe(res => {
          this.spinner.hide();
          this.userInfo = res['userInfo'][0];
          this.courseInfo = res['courseInfo'];
          this.studentCount = res['studentCount'].length;
          this.reviewCount = res['reviewCount'].length;
        })
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

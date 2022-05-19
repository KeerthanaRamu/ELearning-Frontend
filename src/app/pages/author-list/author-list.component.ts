import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InstructorService } from 'src/services/instructor.service';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private instructorService: InstructorService) { }
  catInfo;
  authorInfo;

  ngOnInit(): void {
    this.catInfo = this.instructorService.getCategory();
    console.log("this.catInfo====", this.catInfo);
    this.instructorService.getInstructorListPerCategory(this.catInfo)
      .subscribe(res => {
        this.authorInfo = res;
      })
  }


  tutorsSlides: OwlOptions = {
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
        items: 3
      },
      1200: {
        items: 4
      }
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

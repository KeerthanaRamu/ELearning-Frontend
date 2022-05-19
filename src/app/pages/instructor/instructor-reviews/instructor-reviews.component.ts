import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InstructorService } from 'src/services/instructor.service'; 
import { AuthService } from '../../../../services/auth.service'; 

@Component({
  selector: 'app-instructor-reviews',
  templateUrl: './instructor-reviews.component.html',
  styleUrls: ['./instructor-reviews.component.scss']
})
export class InstructorReviewsComponent implements OnInit {

  reviewInfo: any;
  resObj;
  ratingForm: FormGroup;
  page = 1;
  count = 0;
  tableSize = 5;
  pageInfo={};
  constructor(private authService:AuthService,private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private instructorService: InstructorService) { }

  ngOnInit(): void {
    this.ratingForm = this.formBuilder.group({
      rating: [''],
    });
    this.page=1;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.getRatingReviewPerInstructor(this.pageInfo);
    this.authService.isStateChanged.next(4);
  }

  getRatingReviewPerInstructor(pageInfo) {
    this.instructorService.getRatingReviewPerInstructor(sessionStorage.authToken,pageInfo)
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

  onTableDataChange(event){
    this.page = event;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.getRatingReviewPerInstructor(this.pageInfo);
  }

}

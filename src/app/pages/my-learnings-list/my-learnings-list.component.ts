import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/services/instructor.service';
import { NgForm, FormGroup, FormControl, Validators,FormArray, FormBuilder,AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-my-learnings-list',
  templateUrl: './my-learnings-list.component.html',
  styleUrls: ['./my-learnings-list.component.scss']
})
export class MyLearningsListComponent implements OnInit {


  learningList;
  ratingForm: FormGroup;

  constructor(private toastrService:ToastrService, private router: Router,private instructorService:InstructorService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.ratingForm = this.fb.group({
      courseid:[''],
      rating: [''],
      review:['']

    });
    this.getLearningList();
  }

  getLearningList(){
    this.instructorService.getMyLearningsList(sessionStorage.authToken)
    .subscribe((res)=>{
        this.learningList=res;
        console.log("this.learningList=====",this.learningList)
    })
  }

  getRatingCourse(learndt){
    console.log(learndt);
    this.ratingForm.patchValue({
      courseid:learndt.id,
      rating:learndt.rating,
      review:learndt.review
    })
  
  }
  
  updateRatingInfo(){
    this.instructorService.updateRatingInfo(sessionStorage.authToken,this.ratingForm.value)
    .subscribe(res=>{
      this.getLearningList();
      this.toastrService.success('Updated Successfully')
    })
  }

  showLearningInfo(learndt){
    console.log(learndt);
    let navigationExtras: NavigationExtras = {
      // skipLocationChange: true,
      queryParams: {
        "learn": JSON.stringify(learndt.id),
        "us":JSON.stringify(learndt.user_id),
      }
    }
    this.router.navigate(['/my-learnings'], navigationExtras)
  }

}

import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/services/instructor.service';
import Hls from 'hls.js';
import { NgForm, FormGroup, FormControl, Validators,FormArray, FormBuilder,AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-learnings-overview',
  templateUrl: './my-learnings-overview.component.html',
  styleUrls: ['./my-learnings-overview.component.scss']
})
export class MyLearningsOverviewComponent implements OnInit {

  currentCourseBasic;
  courseForInfo;
  courseObjectiveInfo;
  courseRequirementsInfo;
  instructorInfo;
  viewInfo: any;
  constructor( private router:Router,private route: ActivatedRoute,private toastrService:ToastrService,private instructorService:InstructorService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.viewInfo['id'] = JSON.parse(params["viv"]);
      this.instructorService.getCourseDetailedView(this.viewInfo['id'])
      .subscribe((res) => {
        this.currentCourseBasic=res['courseInfo'][0];
        this.courseForInfo=res['courseFor'];
        this.courseObjectiveInfo=res['courseObjective'];
        this.courseRequirementsInfo=res['courseReq'];
        this.instructorInfo=res['instructorInfo'][0];
      })
    })
  }

}

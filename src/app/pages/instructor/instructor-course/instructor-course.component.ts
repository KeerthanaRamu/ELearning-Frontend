import { Component, OnInit, ChangeDetectorRef,AfterContentChecked } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { InstructorService } from 'src/services/instructor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Hls from 'hls.js';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-instructor-course',
  templateUrl: './instructor-course.component.html',
  styleUrls: ['./instructor-course.component.scss']
})
export class InstructorCourseComponent implements OnInit, AfterContentChecked {


  showCourseList = false;
  showNewCourse = false;
  firstStep = false;
  secondStep = false;
  secondStepNav = false;
  showCuriculum = false;
  showLandPage = false;
  showPrice = false;
  instructorForm: FormGroup;
  assessmentForm: FormGroup;
  assessmentUpdateForm: FormGroup;
  courseInfo;
  successMsg = false;
  coursesList;
  courseObjList = [];
  courseReqList = [];
  courseForList = [];
  categoryList;
  subCategoryList;
  toggleAdd;
  toggleRemove;
  showAdd=false;
  resourceList=[];

  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [5, 10, 15, 20];
  pageInfo={};
  secToDelete;
  lectToDelete;
  secAssessmentId;
  lecAssessmentId;
  assessmentList=[];
  LevelList: Object;
  uploadVideo;

  activeElemLearn='black';
  activeElemCurr='black';
  activeElemLand='black';
  activeElemPrice='black';

  constructor(private authService:AuthService,private spinner: NgxSpinnerService,private cdr: ChangeDetectorRef,private toastrService: ToastrService, private formBuilder: FormBuilder, private instructorService: InstructorService, private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.successMsg = false;
    this.instructorForm = this.formBuilder.group({
      courseTitle: ['', Validators.required],
      category: ['', Validators.required],
      courseObjective: this.formBuilder.array([this.formBuilder.control('')]),
      courseRequirement: this.formBuilder.array([this.formBuilder.control('')]),
      courseFor: this.formBuilder.array([this.formBuilder.control('')]),
      sections: this.formBuilder.array([]),
      courseSubtitle: [''],
      courseDescription: [''],
      courseLevel: [''],
      courseImage: [''],
      primaryInfo: [''],
      courseImage_name: [''],
      coursePrice: [''],
      primaryCategory: [''],
      subcategory: [''],
      sec_title:[''],
      sec_desc:['']
    }, {
    });

    this.assessmentForm =  this.formBuilder.group({
      id:[''],
      question:['', Validators.required],
      option1:['', Validators.required],
      option2:['', Validators.required],
      option3:['', Validators.required],
      option4:['', Validators.required],
      answer:['', Validators.required],
    })
    this.assessmentUpdateForm =  this.formBuilder.group({
      id:[''],
      section_id:[''],
      lecture_id:[''],
      question:['', Validators.required],
      option1:['', Validators.required],
      option2:['', Validators.required],
      option3:['', Validators.required],
      option4:['', Validators.required],
      answer:['', Validators.required],
    })

    this.authService.isStateChanged.next(2);
    // this.addSection();
    this.instructorService.getCategoryList()
      .subscribe(res => {
        this.categoryList = res;
      })

      this.getCourseLevelList();

    if (sessionStorage.courseId) {
      this.spinner.hide();
      this.courseObjList = [];
      this.courseReqList = [];
      this.courseForList = [];
      for (let i = 0; i <= this.courseObjective.length; i++) {
        this.removeObjective(i);
      }
      for (let j = 0; j <= this.courseRequirement.length; j++) {
        this.removeRequirements(j);
      }
      for (let k = 0; k <= this.courseFor.length; k++) {
        this.removeCourseFor(k);
      }
      this.instructorService.getCourseInfo(sessionStorage.courseId)
        .subscribe(res => {
          this.courseInfo = res['courseInfo'][0];
          console.log("this.courseInfo=====",this.courseInfo);
          for (let i = 0; i < res['courseObjective'].length; i++) {
            this.addNewObjective();
            this.courseObjList.push(res['courseObjective'][i].objective)
          }
          for (let j = 0; j < res['courseReq'].length; j++) {
            this.addNewRequirements();
            this.courseReqList.push(res['courseReq'][j].requirement)
          }
          for (let k = 0; k < res['courseFor'].length; k++) {
            this.addNewCourseFor();
            this.courseForList.push(res['courseFor'][k].coursefor)
          }
          console.log(this.courseObjList, this.courseReqList, this.courseForList);
          sessionStorage.courseId = this.courseInfo.id;
          this.instructorForm.patchValue({
            'courseTitle': this.courseInfo.course_title,
            'courseSubtitle': this.courseInfo.course_subtitle,
            'courseDescription': this.courseInfo.course_description,
            'primaryInfo': this.courseInfo.primary_info,
            'courseLevel': this.courseInfo.course_level,
            'category': this.courseInfo.category_id,
            'primaryCategory': this.courseInfo.category_id,
            'subcategory': this.courseInfo.subcategory_id,
            'courseObjective': this.courseObjList,
            'courseRequirement': this.courseReqList,
            'courseFor': this.courseForList,
            'coursePrice': this.courseInfo.course_price
          })
          this.showSecond();
          this.getSubCategory();
        })
    } else {
      this.spinner.hide();
      this.showCourseList = true;
      this.page=1;
      this.pageInfo['page']=this.page-1;
      this.pageInfo['tableSize']=this.tableSize;
      this.getList(this.pageInfo);
    }


  }

  
  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  getList(pageInfo) {
    this.count=0;
    this.instructorService.getCoursesListPerUser(sessionStorage.authToken, pageInfo)
      .subscribe(res => {
        this.spinner.hide();
        this.coursesList = res['courseInfo'];
        this.count=res['courseCount']
        console.log("this.coursesList====", this.coursesList);
      })
  }

  get rf() {
    return this.instructorForm.controls;
  }

  getSubCategory() {
    console.log(this.instructorForm.value.primaryCategory)
    this.instructorService.getSubCategoryList(this.instructorForm.value.primaryCategory)
      .subscribe(res => {
        console.log("res===", res);
        this.subCategoryList = res;
      })
  }

  showCourse() {
    this.spinner.show();
    this.successMsg = false;
    this.showCourseList = true;
    this.showNewCourse = false;
    this.firstStep = false;
    this.secondStep = false;
    this.secondStepNav = false;
    this.showCuriculum = false;
    this.showLandPage = false;
    this.showPrice = false;
    sessionStorage.removeItem('courseId');
    this.page=1;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    for (let i = 0; i <= this.courseObjective.length; i++) {
      this.removeObjective(i);
    }
    for (let j = 0; j <= this.courseRequirement.length; j++) {
      this.removeRequirements(j);
    }
    for (let k = 0; k <= this.courseFor.length; k++) {
      this.removeCourseFor(k);
    }
    this.getList(this.pageInfo);
  }

  createNewCourse() {
    this.successMsg = false;
    this.showCourseList = false;
    this.showNewCourse = true;
    this.firstStep = true;
    this.secondStep = false;
    this.secondStepNav = false;
    this.showCuriculum = false;
    this.showLandPage = false;
    this.showPrice = false;
    this.courseObjList = [];
    this.courseReqList = [];
    this.courseForList = [];
    this.instructorForm.reset();
    for (let i = 1; i <= this.courseObjective.length; i++) {
      this.removeObjective(i);
    }
    for (let j = 1; j <= this.courseRequirement.length; j++) {
      this.removeRequirements(j);
    }
    for (let k = 1; k <= this.courseFor.length; k++) {
      this.removeCourseFor(k);
    }
  }

  showFirst() {
    this.successMsg = false;
    this.showCourseList = false;
    this.showNewCourse = true;
    this.firstStep = true;
    this.secondStep = false;
    this.secondStepNav = false;
    this.showCuriculum = false;
    this.showLandPage = false;
    this.showPrice = false;
  }

  showSecond() {
    this.successMsg = false;
    this.showCourseList = false;
    this.showNewCourse = true;
    this.firstStep = false;
    this.secondStep = true;
    this.secondStepNav = true;
    this.showCuriculum = false;
    this.showLandPage = false;
    this.showPrice = false;
    this.activeElemLearn='blue';
    this.activeElemCurr='black';
    this.activeElemLand='black';
    this.activeElemPrice='black';

  }

  showCurriculum() {
    this.spinner.show();
    this.successMsg = false;
    this.showCourseList = false;
    this.showNewCourse = true;
    this.firstStep = false;
    this.secondStep = false;
    this.secondStepNav = true;
    this.showLandPage = false;
    this.showPrice = false;
    this.toggleAdd=true;
    this.toggleRemove=false;
    this.showCuriculum = true;
    this.activeElemLearn='black';
    this.activeElemCurr='blue';
    this.activeElemLand='black';
    this.activeElemPrice='black';
    this.removeAllSection()
    this.instructorService.getSectionByCourse(sessionStorage.courseId)
      .subscribe(res => {
        this.spinner.hide();
        console.log("res====secdata---", res);
        if(res['data'].length>0){
          console.log("iffff")
          for(let i=0;i<res['data'].length;i++){
            this.addSection();
            if(res['data'][i].lectures.length>0){
              for(let j=0;j<res['data'][i].lectures.length;j++){
                this.addLectures(i);
              }
            }
            
            this.instructorForm.patchValue({
              'sections': res['data']
            });
          }
        }
      })
  }

  showLandingPage() {
    this.spinner.show();
    this.successMsg = false;
    this.showCourseList = false;
    this.showNewCourse = true;
    this.firstStep = false;
    this.secondStep = false;
    this.showCuriculum = false;
    this.showLandPage = true;
    this.secondStepNav = true;
    this.showPrice = false;
    this.activeElemLearn='black';
    this.activeElemCurr='black';
    this.activeElemLand='blue';
    this.activeElemPrice='black';
    this.instructorService.getCourseInfo(sessionStorage.courseId)
      .subscribe(res => {
        this.spinner.hide();
        this.courseInfo = res['courseInfo'][0];
        this.instructorForm.patchValue({
          'courseTitle': this.courseInfo.course_title,
          'courseSubtitle': this.courseInfo.course_subtitle,
          'courseDescription': this.courseInfo.course_description,
          'primaryInfo': this.courseInfo.primary_info,
          'courseLevel': this.courseInfo.course_level,
          'category': this.courseInfo.category_id,
          'primaryCategory': this.courseInfo.category_id,
          'subcategory': this.courseInfo.subcategory_id
        })
      })
  }

  showPricing() {
    this.spinner.show();
    this.successMsg = false;
    this.showCourseList = false;
    this.showNewCourse = true;
    this.firstStep = false;
    this.secondStep = false;
    this.showCuriculum = false;
    this.showLandPage = false;
    this.showPrice = true;
    this.secondStepNav = true;
    this.activeElemLearn='black';
    this.activeElemCurr='black';
    this.activeElemLand='black';
    this.activeElemPrice='blue';
    this.instructorService.getCourseInfo(sessionStorage.courseId)
      .subscribe(res => {
        this.spinner.hide();
        this.courseInfo = res['courseInfo'][0];
        this.instructorForm.patchValue({
          'coursePrice': this.courseInfo.course_price
        })
      })
  }

  classApplied = false;
  toggleClass() {
    this.classApplied = !this.classApplied;
  }
  classApplied1 = false;
  toggleClass1() {
    this.classApplied1 = !this.classApplied1;
  }



  get courseObjective() {
    return this.instructorForm.get('courseObjective') as FormArray;
  }

  get courseRequirement() {
    return this.instructorForm.get('courseRequirement') as FormArray;
  }

  get courseFor() {
    return this.instructorForm.get('courseFor') as FormArray;
  }



  addNewObjective() {
    this.courseObjective.push(this.formBuilder.control(''));
  }

  addNewRequirements() {
    this.courseRequirement.push(this.formBuilder.control(''));
  }

  addNewCourseFor() {
    this.courseFor.push(this.formBuilder.control(''));

  }

  removeObjective(index) {
    (this.instructorForm.get('courseObjective') as FormArray).removeAt(index);
  }

  removeRequirements(index) {
    (this.instructorForm.get('courseRequirement') as FormArray).removeAt(index);
  }

  removeCourseFor(index) {
    (this.instructorForm.get('courseFor') as FormArray).removeAt(index);
  }



  setCourseDetails() {
    this.spinner.show();
    this.instructorService.setCourseDetails(sessionStorage.authToken, this.instructorForm.value)
      .subscribe(res => {
        // alert(res['status']);
        sessionStorage.courseId = res['courseId'];
        this.instructorService.getCourseInfo(sessionStorage.courseId)
          .subscribe(res => {
            this.spinner.hide();
            this.courseInfo = res['courseInfo'][0];
            this.toastrService.success('Course Created Successfully.');
            this.showSecond();
          })
      })
  }

  setCourseIntendorInfo() {
    this.spinner.show();
    console.log("instructorForm====", this.instructorForm.value);
    this.instructorService.setCourseIntendorInfo(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value)
      .subscribe(res => {
        this.spinner.hide();
        // alert(res['status']);
        // this.successMsg = true;
        this.toastrService.success('Updated Successfully.');
      })
  }

  editCourseInfo(courseDt) {
    this.spinner.show();
    this.courseObjList = [];
    this.courseReqList = [];
    this.courseForList = [];
    for (let i = 0; i <= this.courseObjective.length; i++) {
      this.removeObjective(i);
    }
    for (let j = 0; j <= this.courseRequirement.length; j++) {
      this.removeRequirements(j);
    }
    for (let k = 0; k <= this.courseFor.length; k++) {
      this.removeCourseFor(k);
    }
    this.instructorService.editCourseInfo(courseDt)
      .subscribe(res => {
        this.spinner.hide();
        this.courseInfo = res['courseInfo'][0];
        console.log(res['courseReq'].length)

        for (let i = 0; i < res['courseObjective'].length; i++) {
          this.addNewObjective();
          this.courseObjList.push(res['courseObjective'][i].objective)
        }
        for (let j = 0; j < res['courseReq'].length; j++) {
          this.addNewRequirements();
          this.courseReqList.push(res['courseReq'][j].requirement)
        }
        for (let k = 0; k < res['courseFor'].length; k++) {
          this.addNewCourseFor();
          this.courseForList.push(res['courseFor'][k].coursefor)
        }
        console.log(this.courseObjList, this.courseReqList, this.courseForList);
        sessionStorage.courseId = this.courseInfo.id;
        this.instructorForm.patchValue({
          'courseTitle': this.courseInfo.course_title,
          'category': this.courseInfo.category,
          'courseObjective': this.courseObjList,
          'courseRequirement': this.courseReqList,
          'courseFor': this.courseForList
        })
        this.showSecond();
      })
  }


  // -------------------------------Curriculum=============================

  /** Sections */
  sections(): FormArray {
    return this.instructorForm.get('sections') as FormArray;
  }

  newSection(): FormGroup {
    return this.formBuilder.group({
      id: '',
      section_title: '',
      section_description: '',
      lect_title:'',
      lect_desc:'',
      isActive:'',
      lectures: this.formBuilder.array([])
    }); 
    
  }

  toggleAddBtn(){
    this.toggleAdd=false;
    this.toggleRemove=true;
    this.showAdd=true;
    this.instructorForm.patchValue({
      'sec_title':'',
      'sec_desc':''
    })
  }

  addSection() {
   
    this.sections().push(this.newSection());
  }


  
  // removeSection() {
  //   this.toggleAdd=true;
  //   this.toggleRemove=false;
  //   // this.sections().removeAt(ti);
  // }
   removeSection() {
    this.toggleAdd=true;
    this.toggleRemove=false;
    this.showAdd=false;
   }

  removeExistingSection(sec){
    this.secToDelete=sec;
    console.log("sec to delete====",this.secToDelete);
    
  }



  removeAllSection(){
    this.sections().clear();
  }

  /** Lecture */
  lectures(ti): FormArray {
    return this.sections()
      .at(ti)
      .get('lectures') as FormArray;
  }

  newLecture(): FormGroup {
    return this.formBuilder.group({
      id:'',
      lecture_title: '',
      lecture_description: '',
      upload_file: '',
      upload_file_name: '',
      upload_url: '',
      duration:'',
      resource_file:'',
      resource_file_name:''
    });
  }

  addLectures(i: number) {
    
    this.lectures(i).push(this.newLecture());
  }

  removeLecture(ti: number, bi: number) {
    this.lectures(ti).removeAt(bi);
  }

  removeExistingLecture(lect){
    this.lectToDelete=lect;
    console.log("sec to delete====",this.lectToDelete);
    
  }
 


  toggleAccordian(event, index) {
    console.log("0000",event.target)
    const element = event.target;
    element.classList.toggle("active");
    if (this.instructorForm.value.sections[index].isActive == true) {
      this.instructorForm.value.sections[index].isActive = false;
    } else {
      this.instructorForm.value.sections[index].isActive = true;
    }
    
    console.log("----",this.instructorForm.value.sections);
  }

  setSectionDetails() {
    this.spinner.show();
    console.log(this.instructorForm.value);
    this.instructorService.setSectionDetails(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value)
      .subscribe(res => {
        this.spinner.hide();
        this.toastrService.success('Updated Successfully.');
        this.toggleAdd=true;
        this.toggleRemove=false;
        this.showAdd=false;
        this.showCurriculum();
      })
  }


 
  updateSectionDetails(i) {
    this.spinner.show();
    console.log(this.instructorForm.value.sections[i]);
    this.instructorService.updateSectionDetails(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value.sections[i])
      .subscribe(res => {
        this.spinner.hide();
        // alert(res['status']);
        // this.successMsg = true;
        this.toastrService.success('Updated Successfully.');
      })
  }

  deleteSectionInfo(){
    this.spinner.show();
    this.instructorService.deleteSectionInfo(this.secToDelete)
    .subscribe(res=>{
      this.spinner.hide();
        this.toastrService.success("Deleted Successfully!!");
        this.showCurriculum();
    })
  }

  onFileChangeVideo(event, i, bi) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.instructorForm.value.sections[i].lectures[bi].upload_file = file;
    }
  }

  onFileChangeResource(event, i, bi) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.instructorForm.value.sections[i].lectures[bi].resource_file = file;
    }
  }

 
  setLectureDetails(i) {
    this.spinner.show();
    console.log(this.instructorForm.value.sections[i]);
    this.instructorService.setLectureDetails(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value.sections[i])
      .subscribe(res => {
        this.spinner.hide();
        this.toastrService.success('Updated Successfully.');
        this.showCurriculum();
    })
    
  }

  updateLectureVideo(i, bi){
    const formData = new FormData();
    formData.append('baseRoot','root');
    formData.append('courseId',sessionStorage.courseId);
    formData.append('section',JSON.stringify(this.instructorForm.value.sections[i]));
    formData.append('lecture',JSON.stringify(this.instructorForm.value.sections[i].lectures[bi]));
    formData.append('file',this.instructorForm.value.sections[i].lectures[bi].upload_file);
    console.log("this.instructorForm.value.sections[i====",this.instructorForm.value.sections[i].lectures[bi]);
    if(this.instructorForm.value.sections[i].lectures[bi].upload_file != ''){
      this.spinner.show();
        this.instructorService.updateLectureVideo(formData)
        .subscribe(res => {
          this.spinner.hide();
          this.toastrService.success('Updated Successfully.');
        })
      }else{
        this.toastrService.error("Please select file!!")
      }
  }

  updateLectureURL(i, bi){
    if(this.instructorForm.value.sections[i].lectures[bi].upload_url != ''){
      this.spinner.show();
        this.instructorService.updateLectureURL(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value.sections[i], this.instructorForm.value.sections[i].lectures[bi])
        .subscribe(res => {
          this.spinner.hide();
          this.toastrService.success('Updated Successfully.');
        })
      }else{
        this.toastrService.error("Please Enter some value!!")
      }
  }

  updateLectureResource(i, bi){
    const formData = new FormData();
    formData.append('baseRoot','resources');
    formData.append('authToken',sessionStorage.authToken);
    formData.append('courseId',sessionStorage.courseId);
    formData.append('section',JSON.stringify(this.instructorForm.value.sections[i]));
    formData.append('lecture',JSON.stringify(this.instructorForm.value.sections[i].lectures[bi]));
    formData.append('file',this.instructorForm.value.sections[i].lectures[bi].resource_file);
    if(this.instructorForm.value.sections[i].lectures[bi].resource_file != ''){
      this.spinner.show();
      this.instructorService.updateLectureResource(formData)
      .subscribe(res => {
        this.spinner.hide();
        this.toastrService.success('Updated Successfully.');
        this.getResourcesListofLecture(this.instructorForm.value.sections[i].id,this.instructorForm.value.sections[i].lectures[bi].id)
      })
    }else{
      this.toastrService.error("Please select file!!")
    }
  }

  // getExistingResources(i,bi){
  //   this.instructorService.getExistingResources(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value.sections[i], this.instructorForm.value.sections[i].lectures[bi])
  //   .subscribe(res => {
  //     this.instructorForm.value.sections[i].lectures[bi].resourceList=res;
  //     console.log(this.instructorForm.value.sections[i].lectures[bi])
  //   })
  // }

  updateLectureDetails(i, bi) {
    this.spinner.show();
    console.log(this.instructorForm.value.sections[i]);

    this.instructorService.updateLectureDetails(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value.sections[i], this.instructorForm.value.sections[i].lectures[bi])
      .subscribe(res => {
        this.spinner.hide();
        this.toastrService.success('Updated Successfully.');
      })
  }

  deleteLectureInfo(){
    this.spinner.show();
    this.instructorService.deleteLectureInfo(this.lectToDelete)
    .subscribe(res=>{
      this.spinner.hide();
        this.toastrService.success("Deleted Successfully!!");
        this.showCurriculum();
    })
  }

  setCourseLandingInfo() {
    this.spinner.show();
    console.log("instructorForm====", this.instructorForm.value);

    this.instructorService.setCourseLandingInfo(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value)
      .subscribe(res => {
        this.spinner.hide();
        // alert(res['status']);
        // this.successMsg = true;
        this.toastrService.success('Updated Successfully.');
      })
  }

  onFileChangeCourseImage(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.instructorForm.value.courseImage = reader.result;
        this.instructorForm.value.courseImage_name = event.target.files[0].name;
        // this.instructorForm.patchValue({
        //   [sections[i].lectures[bi].upload_file]: reader.result,
        //   upload_file_name : event.target.files[0].name
        // });
      }
    }
  }

  setCoursePriceInfo() {
    this.spinner.show();
    this.instructorService.setCoursePriceInfo(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value)
      .subscribe(res => {
        this.spinner.hide();
        // alert(res['status']);
        // this.successMsg = true;
        this.toastrService.success('Updated Successfully.');
      })
  }

  onTableDataChange(event) {
    this.page = event;
    this.pageInfo['page']=this.page-1;
    this.pageInfo['tableSize']=this.tableSize;
    this.getList(this.pageInfo);
  }

  publishCourse(){
    this.spinner.show();
    this.instructorService.publishCourse(sessionStorage.authToken, sessionStorage.courseId, this.instructorForm.value)
      .subscribe(res => {
        this.spinner.hide();
        // alert(res['status']);
        // this.successMsg = true;
        this.toastrService.success('Course Published Successfully.');
      })
  }


  getResourcesListofLecture(sectionId,lectureId){
    this.resourceList=[];
    console.log("------=========-----------",sectionId,lectureId)
    this.instructorService.getResourcesListofLecture(sessionStorage.authToken, sessionStorage.courseId,sectionId,lectureId)
    .subscribe(res => {
      this.resourceList=res['data'];
    })
  }

  deleteResourceInfo(resrc){
    this.spinner.show();
      console.log("resrc------------",resrc);
      this.instructorService.deleteResourceInfo(resrc)
      .subscribe(res=>{
        this.spinner.hide();
        this.toastrService.success('Deleted Successfully.');
        this.getResourcesListofLecture(resrc.section_id,resrc.lecture_id)

      })
  }

  addNewQuestion(secId,lecId){
    this.secAssessmentId=secId;
    this.lecAssessmentId=lecId;
    this.assessmentForm.patchValue({
      id:'',
      question:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      answer:'',
    })
  }

  getAssessmentList(secId,lecId){
    this.assessmentList=[];
    this.instructorService.getAssessmentList(sessionStorage.authToken,sessionStorage.courseId,secId,lecId)
    .subscribe(res=>{
      this.assessmentList=res['data'];
    })
  }

  setAssessmentInfo(){
    this.spinner.show();
    this.instructorService.setAssessmentInfo(sessionStorage.authToken,sessionStorage.courseId,this.secAssessmentId,this.lecAssessmentId,this.assessmentForm.value)
    .subscribe(res=>{
      this.spinner.hide();
          this.getAssessmentList(this.secAssessmentId,this.lecAssessmentId);
          this.secAssessmentId='';
          this.lecAssessmentId='';
        this.toastrService.success('Updated Successfully!!')
    })
  }

  editAssessmentInfo(assessdt){
   this.assessmentUpdateForm.patchValue({
     id:assessdt.id,
     section_id:assessdt.section_id,
     lecture_id:assessdt.lecture_id,
     question:assessdt.question,
     option1:assessdt.option1,
     option2:assessdt.option2,
     option3:assessdt.option3,
     option4:assessdt.option4,
     answer:assessdt.answer,
   })
  }

  updateAssessmentInfo(){
    this.spinner.show();
    this.instructorService.updateAssessmentInfo(this.assessmentUpdateForm.value)
    .subscribe(res=>{
      this.spinner.hide();
      console.log("this.assessmentUpdateForm.value.section_id===",this.assessmentUpdateForm.value.section_id);
          this.getAssessmentList(this.assessmentUpdateForm.value.section_id,this.assessmentUpdateForm.value.lecture_id);
        this.toastrService.success('Updated Successfully!!')
    })
  }

  deleteAssessmentInfo(assessdt){
    this.spinner.show();
    console.log("assessdt------------",assessdt);
    this.instructorService.deleteAssessmentInfo(assessdt)
    .subscribe(res=>{
      this.spinner.hide();
      this.toastrService.success('Deleted Successfully.');
      this.getAssessmentList(assessdt.section_id,assessdt.lecture_id);

    })
}

getCourseLevelList(){
  this.LevelList = [];
  this.instructorService.getCourseLevelList()
  .subscribe(res => {
    console.log("res===", res);
    this.LevelList = res;
  })
}

}

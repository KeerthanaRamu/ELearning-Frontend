import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InstructorService } from '../../../services/instructor.service'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';
import { FormControl, FormGroup, FormBuilder,FormArray } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-courses-list-subcategory',
  templateUrl: './courses-list-subcategory.component.html',
  styleUrls: ['./courses-list-subcategory.component.scss']
})
export class CoursesListSubcategoryComponent implements OnInit {

  categoryInfo={};
  categoryData;
  userCartInfo;
  resObj;
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [5, 10, 15, 20];
  authorInfo;
  authorObj;
  levelData: any;
  filterForm: FormGroup;
  filterObj= {};
  ratingList=[{'type':'4.5 & up','val':'4.5'},{'type':'4.0 & up','val':'4.0'},{'type':'3.5 & up','val':'3.5'},{'type':'3.0 & up','val':'3.0'}]

  constructor(private spinner: NgxSpinnerService,private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private router: Router, private route: ActivatedRoute, private instructorService: InstructorService) { 
    this.filterForm = this.formBuilder.group({
      rating: [''],
      level:new FormArray([])
    }, {
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.route.queryParams.subscribe(params => {
      this.categoryInfo['id'] = JSON.parse(params["catId"]);
      this.page=1;
      this.categoryInfo['page']=this.page -1;
      this.categoryInfo['itemsPerPage']=this.tableSize;
      console.log(this.categoryInfo);
      this.page=1;
      (this.filterForm.controls['level'] as FormArray).clear();
      this.getLevelListCount();
      this.goToSubCoursesList(this.categoryInfo);
      this.instructorService.getInstructorListPerSubCategory(this.categoryInfo)
        .subscribe(res => {
          this.authorInfo=[];
          this.authorObj = res;
          for(let i=0;i<this.authorObj.length;i++){
            this.authorObj[i].ratingSum=0;
            this.authorObj[i].ratingCount=0;
            if(this.authorObj[i].studentList.length > 0){
              for(let j=0;j<this.authorObj[i].studentList.length;j++){
                if(this.authorObj[i].studentList[j].rating != null){
                  this.authorObj[i].ratingSum=Number(this.authorObj[i].ratingSum)+Number(this.authorObj[i].studentList[j].rating);
                  this.authorObj[i].ratingCount++;
                }
              }
            }
          }

          for(let k=0;k<this.authorObj.length;k++){
            if(this.authorObj[k].ratingCount > 1){
              this.authorObj[k].averageRating= (this.authorObj[k].ratingSum/this.authorObj[k].ratingCount).toFixed(1);
            }else{
              this.authorObj[k].averageRating = (this.authorObj[k].ratingSum/1).toFixed(1);
            }
        }

          this.authorInfo=this.authorObj;
        })

        

    })
  }

  goToSubCoursesList(categoryInfo) {
    this.instructorService.getCoursesPerSubCategory(categoryInfo,sessionStorage.authToken)
      .subscribe(res => {
        this.spinner.hide();
        this.count=0;
        this.categoryData=[];
        this.resObj = res['courseInfo'];
        this.count=res['catCount'];
        console.log("this.resObj==subbbbbbbbbbbbbbbb==",this.resObj);
        this.categoryData = this.resObj;
        for(let i=0;i<this.categoryData.length;i++){
          if(this.categoryData[i].cart_status == 'Open'){
            this.categoryData[i].funcName='Go To Cart';
          }else if(this.categoryData[i].cart_status == 'Closed'){
            this.categoryData[i].funcName='';
          }else{
            this.categoryData[i].funcName='Add To Cart';
          }
        }

        for(let k=0;k<this.ratingList.length;k++){
          this.ratingList[k]['count']=0;
          for(let j=0;j<this.categoryData.length;j++){
              if(Number(this.ratingList[k].val) <= this.categoryData[j].averageRating){
                this.ratingList[k]['count']++;
              }
          }
        }
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

  getFilterValue(){
    console.log("---sdfdsfdfdsf--",this.filterForm.value);
      this.filterObj['level'] = this.filterForm.value.level
      .map((v, i) => v ? this.levelData[i].id : null)
      .filter(v => v !== null);

      if(this.filterForm.value.rating != ''){
        this.filterObj['rating'] = this.filterForm.value.rating
      }
     
    this.filterObj['id']=this.categoryInfo['id'];
    this.filterObj['page']=this.page-1;
    this.filterObj['itemsPerPage']=this.tableSize;
   console.log("dsfsdf=========",this.filterObj)
    if(this.filterObj['rating'] || this.filterObj['level'].length > 0){
      this.instructorService.getFilteredSubCatCourseDetails(this.filterObj,sessionStorage.authToken)
      .subscribe(res=>{
        this.count=0;
        this.categoryData=[];
        this.count=res['catCount'];
        this.categoryData = res['courseInfo'];
        for(let i=0;i<this.categoryData.length;i++){
          if(this.categoryData[i].cart_status == 'Open'){
            this.categoryData[i].funcName='Go To Cart';
          }else if(this.categoryData[i].cart_status == 'Closed'){
            this.categoryData[i].funcName='';
          }else{
            this.categoryData[i].funcName='Add To Cart';
          }
        }
         for(let k=0;k<this.ratingList.length;k++){
          this.ratingList[k]['count']=0;
          for(let j=0;j<this.categoryData.length;j++){
              if(Number(this.ratingList[k].val) <= this.categoryData[j].averageRating){
                this.ratingList[k]['count']++;
              }
          }
        }
      })
    }else{
      this.goToSubCoursesList(this.categoryInfo);
    }
  }


  onTableDataChange(event) {
    this.page = event;
    this.categoryInfo['page']= this.page-1;
    this.filterObj['page']= this.page-1;
    if(this.filterObj['rating'] || this.filterObj['level']){
      this.instructorService.getFilteredSubCatCourseDetails(this.filterObj,sessionStorage.authToken)
      .subscribe(res=>{
        this.count=0;
        this.categoryData=[];
        this.count=res['catCount'];
        this.categoryData = res['courseInfo'];
        for(let i=0;i<this.categoryData.length;i++){
          if(this.categoryData[i].cart_status == 'Open'){
            this.categoryData[i].funcName='Go To Cart';
          }else if(this.categoryData[i].cart_status == 'Closed'){
            this.categoryData[i].funcName='';
          }else{
            this.categoryData[i].funcName='Add To Cart';
          }
        }
      })
    }else{
      this.instructorService.getCoursesPerSubCategory(this.categoryInfo,sessionStorage.authToken)
      .subscribe(res => {
        this.count=0;
        this.categoryData=[];
        this.resObj = res['courseInfo'];
        this.count=res['catCount'];
        console.log("this.resObj====",this.resObj);
        this.categoryData = this.resObj;
        for(let i=0;i<this.categoryData.length;i++){
          if(this.categoryData[i].cart_status == 'Open'){
            this.categoryData[i].funcName='Go To Cart';
          }else if(this.categoryData[i].cart_status == 'Closed'){
            this.categoryData[i].funcName='';
          }else{
            this.categoryData[i].funcName='Add To Cart';
          }
        }
      })
    }
  }


  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.goToSubCoursesList(this.categoryInfo);
  }

  coursesSlides: OwlOptions = {
    loop: false,
    nav: true,
    dots: false,
    stagePadding: 0,
    items: 1,
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

  getLevelListCount(){
    this.levelData=[];
    this.instructorService.getLevelListCountForSubCat(this.categoryInfo['id'])
    .subscribe(res=>{
      this.levelData=res['levelInfo'];
      this.levelData.forEach(() => this.levelFormArray.push(new FormControl(false)));
    })
  }

  get levelFormArray() {
    return this.filterForm.controls.level as FormArray;
  }

  goToCourseInfo(catDt) {
    console.log("goToCourseInfo===", catDt)
    this.instructorService.goToCourseInfo(catDt)
      .subscribe(res => {
        this.categoryData = res;
        console.log("this.categoryData===", this.categoryData);
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

  classApplied = false;
  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  setWishlist(coursedt){
    coursedt.wishStatus = !coursedt.wishStatus;
    coursedt.wishliStatus=(coursedt.wishStatus == true ? 1 : 0);
    console.log("coursedt==",coursedt);
    this.instructorService.setWishlist(sessionStorage.authToken,coursedt)
    .subscribe(res=>{
      this.authService.isUserLoggedIn.next(true);
      this.toastrService.success('updated Successfully');
      
    })
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

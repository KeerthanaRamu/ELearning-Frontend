import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder ,Validators, FormArray, FormControl} from '@angular/forms';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InstructorService } from '../../../services/instructor.service'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  categoryInfo={};
  categoryData;
  categoryCarouselData;
  userCartInfo;
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [5, 10, 15, 20];
  authorInfo;
  authorObj;
  subCategoryList;
  filterForm:FormGroup;
  filterObj= {};
  levelData:any;
  ratingList=[{'type':'4.5 & up','val':'4.5'},{'type':'4.0 & up','val':'4.0'},{'type':'3.5 & up','val':'3.5'},{'type':'3.0 & up','val':'3.0'}]

  constructor(private spinner: NgxSpinnerService,private authService:AuthService,private toastrService:ToastrService,private router: Router, private formBuilder:FormBuilder,private route: ActivatedRoute, private instructorService: InstructorService) { 
    this.filterForm = this.formBuilder.group({
      rating: [''],
      sub_category: new FormArray([]),
      level:new FormArray([])
    }, {
    });
  }

  ngOnInit(): void {
    this.spinner.show()
    this.route.queryParams.subscribe(params => {
      this.categoryInfo['id'] = JSON.parse(params["catId"]);
      this.page=1;
      this.categoryInfo['page']=this.page -1;
      this.categoryInfo['itemsPerPage']=this.tableSize;
      this.filterForm.patchValue({
        'rating':''
      });
      (this.filterForm.controls['sub_category'] as FormArray).clear();
      (this.filterForm.controls['level'] as FormArray).clear();
      this.getSubCategoryList();
      this.getLevelListCount()
      this.getCoursesList(this.categoryInfo);
      // this.getCoursesListForCarousel(this.categoryInfo)
      this.instructorService.getInstructorListPerCategory(this.categoryInfo)
        .subscribe(res => {
          this.authorInfo=[];
          console.log("res===", res);
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

  get subCategoryFormArray() {
    return this.filterForm.controls.sub_category as FormArray;
  }

  get levelFormArray() {
    return this.filterForm.controls.level as FormArray;
  }

  getSubCategoryList(){
    
    this.instructorService.getSubCategoryListCount(this.categoryInfo['id'])
    .subscribe(res=>{
      this.subCategoryList=res['subCatData'];
      this.subCategoryList.forEach(() => this.subCategoryFormArray.push(new FormControl(false)));
    })
  }

  getLevelListCount(){
    this.instructorService.getLevelListCount(this.categoryInfo['id'])
    .subscribe(res=>{
      this.levelData=res['levelInfo'];
      this.levelData.forEach(() => this.levelFormArray.push(new FormControl(false)));
    })
  }

  getCoursesList(categoryInfo) {
    console.log(categoryInfo)
    this.instructorService.getCoursesPerCategory(categoryInfo,sessionStorage.authToken)
      .subscribe(res => {
        this.spinner.hide();
        this.count=0;
        this.categoryData=[];
        this.count=res['catCount'];
        this.categoryData = res['courseInfo'];
        this.categoryCarouselData = res['courseInfo'];
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

        console.log("this.categoryData===",this.categoryData,this.ratingList);
      })
  }

  // getCoursesListForCarousel(categoryInfo){
  //   this.instructorService.getCoursesListForCarousel(categoryInfo.id,sessionStorage.authToken)
  //     .subscribe(res => {
  //       this.categoryCarouselData=[];
  //       this.categoryCarouselData = res['courseDetails'];
  //       for(let j=0;j<this.categoryCarouselData.length;j++){
  //         if(this.categoryCarouselData[j].cart_status == 'Open'){
  //           this.categoryCarouselData[j].funcName='Go To Cart';
  //         }else if(this.categoryCarouselData[j].cart_status == 'Closed'){
  //           this.categoryCarouselData[j].funcName='';
  //         }else{
  //           this.categoryCarouselData[j].funcName='Add To Cart';
  //         }
  //       }
  //     })
  // }


  tutorsSlides: OwlOptions = {
    loop: false,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: false,
    margin: 30,
    navText: [
      '<i class="bx bx-left-arrow-alt"></i>',
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

  onTableDataChange(event) {
    this.page = event;
    this.categoryInfo['page']= this.page-1;
    this.filterObj['page']= this.page-1;
    if(this.filterObj['rating'] || this.filterObj['level'] || this.filterObj['sub_category']){
      this.instructorService.getFilteredCourseDetails(this.filterObj,sessionStorage.authToken)
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
      this.instructorService.getCoursesPerCategory(this.categoryInfo,sessionStorage.authToken)
      .subscribe(res => {
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
        console.log("this.categoryData===",this.categoryData);
      })
    }
    
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.categoryInfo['page']= this.page-1;
    this.categoryInfo['itemsPerPage']= this.tableSize;
    this.filterObj['page']= this.page-1;
    this.filterObj['itemsPerPage']= this.tableSize;
    if(this.filterObj['rating'] || this.filterObj['level'] || this.filterObj['sub_category']){
      this.instructorService.getFilteredCourseDetails(this.filterObj,sessionStorage.authToken)
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
      this.instructorService.getCoursesPerCategory(this.categoryInfo,sessionStorage.authToken)
      .subscribe(res => {
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
        console.log("this.categoryData===",this.categoryData);
      })
    }
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

  getFilterValue(){
    console.log("---sdfdsfdfdsf--",this.filterForm.value);
    this.filterObj['sub_category'] = this.filterForm.value.sub_category
      .map((v, i) => v ? this.subCategoryList[i].id : null)
      .filter(v => v !== null);

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
    if(this.filterObj['rating'] || this.filterObj['level'].length > 0 || this.filterObj['sub_category'].length > 0){
      this.instructorService.getFilteredCourseDetails(this.filterObj,sessionStorage.authToken)
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
      this.getCoursesList(this.categoryInfo);
    }
    

    // this.categoryData = this.categoryData.filter(
    //   catdt => Number(catdt.averageRating) >= Number(this.filterForm.value.rating));
    //   this.count=this.categoryData.length;
  }

  clearFilters(){
    this.filterForm.patchValue({
      'rating':''
    });
    (this.filterForm.controls['sub_category'] as FormArray).clear();
    (this.filterForm.controls['level'] as FormArray).clear();
    this.filterObj={};
    this.getSubCategoryList();
    this.getLevelListCount();
    this.getCoursesList(this.categoryInfo);
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

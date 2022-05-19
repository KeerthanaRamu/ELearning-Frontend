import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { InstructorService } from 'src/services/instructor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  categoryUpdateForm: FormGroup;
  categoryList: any;
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [5, 10, 15, 20];

  constructor(private spinner: NgxSpinnerService,private authService: AuthService,private formBuilder:FormBuilder,private instructorService:InstructorService,private router:Router,private toastrService:ToastrService) {
    this.categoryForm = this.formBuilder.group({
      category:['',Validators.required],
      active:['']
    });
    this.categoryUpdateForm = this.formBuilder.group({
      id:[''],
      category:['',Validators.required],
      active:['']
    })
   }

  ngOnInit(): void {
    this.spinner.show();
    this.getCategoryList();
    this.authService.isStateChanged.next(2);
  }

  setCategoryInfo(){
    console.log("this.categoryForm.value===",this.categoryForm.value);
    this.categoryForm.value.active = (this.categoryForm.value.active == true ? 1 :0)
      this.instructorService.setCategoryInfo(this.categoryForm.value)
      .subscribe(res=>{
          this.toastrService.success('Updated Successfully!!');
          this.getCategoryList();
      })
  }

  onTableDataChange(event) {
    this.page = event;
    this.getCategoryList();
  }


  getCategoryList(){
    this.instructorService.getCategoryListMaster()
    .subscribe(res=>{
      this.spinner.hide();
      this.categoryList=res;
    })
  }

  editCategory(catDt){
    this.categoryUpdateForm.patchValue({
        'id':catDt.id,
        'category':catDt.category,
        'active':catDt.active
    })
  }

  updateCategoryInfo(){
    console.log("this.categoryForm.value===",this.categoryForm.value);
    this.categoryUpdateForm.value.active = (this.categoryUpdateForm.value.active == true ? 1 :0)
      this.instructorService.updateCategoryInfo(this.categoryUpdateForm.value)
      .subscribe(res=>{
          this.toastrService.success('Updated Successfully!!');
          this.getCategoryList();
      })
  }

}

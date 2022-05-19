import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { InstructorService } from 'src/services/instructor.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { AuthService } from 'src/services/auth.service'

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.scss']
})
export class CreateSubcategoryComponent implements OnInit {

  subcategoryForm: FormGroup;
  subcategoryUpdateForm: FormGroup;
  categoryList: any;
  subcategoryList:any;
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [5, 10, 15, 20];

  constructor(private spinner: NgxSpinnerService,private authService: AuthService,private formBuilder:FormBuilder,private instructorService:InstructorService,private router:Router,private toastrService:ToastrService) {
    this.subcategoryForm = this.formBuilder.group({
      category:['',Validators.required],
      subcategory:['',Validators.required],
      active:['']
    });
    this.subcategoryUpdateForm = this.formBuilder.group({
      id:[''],
      category:['',Validators.required],
      subcategory:['',Validators.required],
      active:['']
    })
   }

  ngOnInit(): void {
    this.spinner.show();
    this.getCategoryList();
    this.getSubCategoryList();
    this.authService.isStateChanged.next(3);
  }

  setSubCategoryInfo(){
    console.log("this.categoryForm.value===",this.subcategoryForm.value);
    this.subcategoryForm.value.active = (this.subcategoryForm.value.active == true ? 1 :0)
      this.instructorService.setSubCategoryInfo(this.subcategoryForm.value)
      .subscribe(res=>{
          this.toastrService.success('Updated Successfully!!');
          this.getSubCategoryList();
      })
  }

  onTableDataChange(event) {
    this.page = event;
    this.getSubCategoryList();
  }


  getCategoryList(){
    this.instructorService.getCategoryListMaster()
    .subscribe(res=>{
      this.categoryList=res;
    })
  }

  getSubCategoryList(){
    this.instructorService.getSubCategoryListMaster()
    .subscribe(res=>{
      this.spinner.hide();
      this.subcategoryList=res;
    })
  }

  editSubCategory(catDt){
    this.subcategoryUpdateForm.patchValue({
        'id':catDt.id,
        'category':catDt.category_id,
        'subcategory':catDt.subcategory,
        'active':catDt.active
    })
  }

  updateSubCategoryInfo(){
    console.log("this.subcategoryForm.value===",this.subcategoryUpdateForm.value);
    this.subcategoryUpdateForm.value.active = (this.subcategoryUpdateForm.value.active == true ? 1 :0)
      this.instructorService.updateSubCategoryInfo(this.subcategoryUpdateForm.value)
      .subscribe(res=>{
          this.toastrService.success('Updated Successfully!!');
          this.getSubCategoryList();
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/services/instructor.service';
import Hls from 'hls.js';
import { NgForm, FormGroup, FormControl, Validators,FormArray, FormBuilder,AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-my-whishlist',
  templateUrl: './my-whishlist.component.html',
  styleUrls: ['./my-whishlist.component.scss']
})
export class MyWhishlistComponent implements OnInit {
  wishList;

  constructor(private authService:AuthService,private router:Router,private toastrService:ToastrService,private instructorService:InstructorService,private fb:FormBuilder) { }


  ngOnInit(): void {
    this.getWishList();
  }

  getWishList(){
    this.instructorService.getWishList(sessionStorage.authToken)
    .subscribe((res)=>{
        this.wishList=res;
        console.log("this.learningList=====",this.wishList)
    })
  }

  addToCart(coursedt){
    console.log("coursedt=====",coursedt);
    if(sessionStorage.authToken){
      if(coursedt.funcName == "Go to Cart"){
        this.router.navigate(['/cart']);
      }else{
        this.instructorService.setAddToCartDetails(sessionStorage.authToken,coursedt)
        .subscribe(res=>{
          this.authService.isUserLoggedIn.next(true);
          this.router.navigate(['/cart']);
        })
      }
      
    }else{
      alert("Please Login to Continue!!!");
      // this.toastrService.error('Please Login to Continue!!!.');
    }
    
  }

  setWishlist(coursedt){
    coursedt.wishStatus = !coursedt.wishStatus;
    coursedt.wishliStatus=(coursedt.wishStatus == true ? 1 : 0);
    console.log("coursedt==",coursedt);
    this.instructorService.setWishlist(sessionStorage.authToken,coursedt)
    .subscribe(res=>{
      this.getWishList();
      this.authService.isUserLoggedIn.next(true);
      this.toastrService.success('updated Successfully');
      
    })
  }

}

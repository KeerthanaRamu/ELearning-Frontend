import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators,FormArray, FormBuilder,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  profileForm: FormGroup;
  userInfo: any;
  cartCount: any;


  constructor(private authService:AuthService,private toastrService: ToastrService,private formBuilder: FormBuilder,private loginService:LoginService,private router:Router,private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
     this.profileForm = this.formBuilder.group({
        id:[''],
        first_name: ['', Validators.required],
        last_name:[''],
        headline: [''],
        biography: [''],
        twitter:[''],
        website: [''],
        linkedIn:[''],
        facebook:[''],
        youtube:[''],
      }, {
    });
    this.getCurrentUser();
    this.authService.isStateChanged.next(1);
  }

  getCurrentUser(){
    this.loginService.getCurrentUser(sessionStorage?.authToken)
    .subscribe(res=>{
        this.userInfo=res['userInfo'][0];
        this.profileForm.patchValue({
          'id':this.userInfo.id,
          'first_name':this.userInfo.user_name,
          'last_name':this.userInfo.last_name,
          'headline':this.userInfo.head_line,
          'biography':this.userInfo.biography,
          'twitter':this.userInfo.twitter,
          'website':this.userInfo.website,
          'linkedIn':this.userInfo.linkedin,
          'facebook':this.userInfo.facebook,
          'youtube':this.userInfo.youtube,
        })
        this.cartCount=res['cartInfo'].length;
        this.cdr.detectChanges();
        console.log("this.userInfo===",this.userInfo);
    })
  }


  updateProfileInfo(){
    console.log("this.profileForm.value==========",this.profileForm.value);
    this.loginService.updateProfileInfo(this.profileForm.value)
    .subscribe(res=>{
      this.toastrService.success('Updated Successfully.');
    })
  }

}

import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators,FormArray, FormBuilder,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-account-security',
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.scss']
})
export class AccountSecurityComponent implements OnInit {

  accountSecurityForm:FormGroup;
  userInfo: any;

  constructor(private authService:AuthService,private toastrService: ToastrService,private formBuilder: FormBuilder,private loginService:LoginService,private router:Router,private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.accountSecurityForm = this.formBuilder.group({
      id:[''],
      existing_email:[''],
      email_id: ['',Validators.required],
      password:[''],
      existing_password:[''],
      current_password:[''],
      new_password:[''],
      confirm_password:['']
    }, {
  });
  this.getCurrentUser();
  this.authService.isStateChanged.next(3);
  }

  getCurrentUser(){
    this.loginService.getCurrentUser(sessionStorage?.authToken)
    .subscribe(res=>{
        this.userInfo=res['userInfo'][0];
        this.accountSecurityForm.patchValue({
          'id':this.userInfo.id,
          'existing_email':this.userInfo.email_id,
          'email_id':this.userInfo.email_id,
          'password':this.userInfo.password,
        })
        this.cdr.detectChanges();
        console.log("this.userInfo===",this.userInfo);
    })
  }

  UpdateEmailAddress(){
    this.loginService.UpdateEmailAddress(this.accountSecurityForm.value)
    .subscribe(res=>{
          if(res['status'] == 'Success'){
            this.toastrService.success('Updated Successfully.');
            this.getCurrentUser();
          }else if(res['status'] == 'Nochange'){
            this.toastrService.error('Email address is unavailable.');
          }else if(res['status'] == 'Email exists'){
            this.toastrService.error('Email address Already Exists.');
          }else if(res['status'] == 'Password Mismatch'){
            this.toastrService.error('Password is not Correct.');
          }
    })
  }

  UpdatePassword(){
    if(this.accountSecurityForm.value.password != this.accountSecurityForm.value.current_password ){
      this.toastrService.error('Your Password is not Correct.');
    }else{
      if(this.accountSecurityForm.value.new_password != this.accountSecurityForm.value.confirm_password ){
        this.toastrService.error('Your new password does not match confirmation');
      }else{
        this.loginService.UpdatePassword(this.accountSecurityForm.value)
        .subscribe(res=>{
          if(res['status'] == 'Success'){
            this.toastrService.success('Updated Successfully.');
            this.getCurrentUser();
          }
        })
      }
    }
  }

}

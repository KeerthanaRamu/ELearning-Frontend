import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  userData;

  selectedItem = {
    firstLi: 0
  }

  constructor(private spinner: NgxSpinnerService,private cdref: ChangeDetectorRef, private authService: AuthService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.loginService.getCurrentUser(sessionStorage?.authToken)
      .subscribe(res => {
        this.spinner.hide();
        this.userData = res['userInfo'][0];
      })
      this.authService.isStateChanged.subscribe(levelvalue => {
        console.log("valueee===",levelvalue);
        this.listClick( levelvalue, 'firstLi')
      })
  }

  logOut() {
    sessionStorage.clear();
    this.authService.isUserLoggedIn.next(false);
    this.authService.isUser.next(false);
    this.router.navigate(['/login']);
  }


  listClick( newValue, value) {
    console.log(newValue);
      this.selectedItem[value] = newValue;
      console.log("1111111111111",this.selectedItem)
      this.cdref.detectChanges();
  }



}

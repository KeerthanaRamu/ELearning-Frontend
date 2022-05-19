import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { InstructorService } from 'src/services/instructor.service';
import { AuthService } from 'src/services/auth.service'
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  BusinessModel: any;
  selectedItem = {
    firstLi: 0
  }
  constructor(private authService: AuthService, private loginService: LoginService, private instructorService: InstructorService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.loginService.getBusinessRule()
      .subscribe(res => {
        console.log("res=====", res);
        this.BusinessModel = res[0].business_model;
      })

      this.authService.isStateChanged.subscribe(levelvalue => {
        console.log("valueee===",levelvalue);
        this.listClick( levelvalue, 'firstLi')
      })
  }

  listClick( newValue, value) {
    console.log(newValue);
      this.selectedItem[value] = newValue;
      console.log("1111111111111",this.selectedItem);
  }
}

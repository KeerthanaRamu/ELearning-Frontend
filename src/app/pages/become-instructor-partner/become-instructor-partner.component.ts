import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-become-instructor-partner',
  templateUrl: './become-instructor-partner.component.html',
  styleUrls: ['./become-instructor-partner.component.scss']
})
export class BecomeInstructorPartnerComponent implements OnInit {
  isUserLoggedIn: boolean;
  isUser: boolean;

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe(value => {
      console.log("value===logged===", value);
      value = (sessionStorage?.authToken ? true : false)
      this.isUserLoggedIn = value;
      this.authService.isUser.subscribe(value => {
          console.log("value===logged===", value);
          value = (sessionStorage?.ullevel == 0 ? true : false)
          this.isUser = value;
      })
  });
  }


  goToInstructor(){
    console.log("this.isUserLoggedIn====",this.isUserLoggedIn,this.isUser);
    if(this.isUserLoggedIn && this.isUser){
        this.router.navigate(['/instructor'])
    }else if(this.isUserLoggedIn && !this.isUser){
      this.router.navigate(['/admin/create-course'])
    }else{
      this.router.navigate(['/login'])
    }
  }

}

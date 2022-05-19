import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoginService } from 'src/services/login.service';
import { InstructorService } from 'src/services/instructor.service';
import { AuthService } from 'src/services/auth.service'
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-header-style-one',
    templateUrl: './header-style-one.component.html',
    styleUrls: ['./header-style-one.component.scss']
})
export class HeaderStyleOneComponent implements OnInit {
    userInfo;
    cartCount;
    isUserLoggedIn: boolean;
    isUser: boolean; 
    subCategoryList;
    wishCount: any;
    BusinessModel;
    showMessage: boolean;
    messageCount: any;
    constructor(private authService: AuthService, private loginService: LoginService, private instructorService: InstructorService, private router: Router, private cdr: ChangeDetectorRef) {

    }

    categoryList;

    ngOnInit(): void {
        this.getMessageCount();
        this.loginService.getBusinessRule()
            .subscribe(res => {
                this.BusinessModel = res[0].business_model;
            })
        this.instructorService.getCategoryList()
            .subscribe(res => {
                this.categoryList = res;
                console.log("categoryList===", this.categoryList)
            })
        this.authService.isUserLoggedIn.subscribe(value => {
            console.log("value===logged===", value);
            value = (sessionStorage?.authToken ? true : false)
            this.isUserLoggedIn = value;
            this.authService.isUser.subscribe(value => {
                console.log("value===logged===", value);
                value = (sessionStorage?.ullevel == 0 ? true : false)
                this.isUser = value;
                this.loginService.getCurrentUser(sessionStorage?.authToken)
                    .subscribe(res => {
                        this.userInfo = res['userInfo'][0];
                        this.cartCount = res['cartInfo'].length;
                        this.wishCount = res['wishCount'].length;
                        this.cdr.detectChanges();
                        console.log("this.userInfo===", this.userInfo);
                    })
            })
        });


    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    classApplied2 = false;
    toggleClass2() {
        this.classApplied2 = !this.classApplied2;
    }

    classApplied3 = false;
    toggleClass3() {
        this.classApplied3 = !this.classApplied3;
    }

    classApplied4 = false;
    toggleClass4() {
        this.classApplied4 = !this.classApplied4;
    }

    checkForUser(){
        console.log("url----------",this.router.url,"-----",this.router.url.split('/')[1])
        if(this.router.url.split('/')[1] == 'instructor'){
            this.showMessage=false;
        }else{
            this.showMessage=true;
        }

    }

    logOut() {
        sessionStorage.clear();
        this.authService.isUserLoggedIn.next(false);
        this.authService.isUser.next(false);
        this.router.navigate(['/login']);
    }

    goToSettings() {
        this.router.navigate(['/settings/profile']);
    }

    goToMessages(){
        this.router.navigate(['/messages']);
    }

    goToCoursesList(cat) {
        let navigationExtras: NavigationExtras = {
            // skipLocationChange: true,
            queryParams: {
                "catId": JSON.stringify(cat.id),
            }
        }
        this.router.navigate(['/courses-list'], navigationExtras);
    }

    getSubCategoryList(cat) {
        this.instructorService.getSubCategoryList(cat.id)
            .subscribe(res => {
                this.subCategoryList = res;
            })
    }

    goToSubCoursesList(subcat) {
        console.log("subcat=====", subcat);
        let navigationExtras: NavigationExtras = {
            // skipLocationChange: true,
            queryParams: {
                "catId": JSON.stringify(subcat.id),
            }
        }
        this.router.navigate(['/courses-list-sub'], navigationExtras);
    }


    getMessageCount(){
        this.instructorService.getMessageCount(sessionStorage.authToken)
        .subscribe(res=>{
          this.messageCount=res['data']
        })
      }



}
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageRoutingModule } from './pages-routing.module';
import { WebcamModule } from 'ngx-webcam';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-tabset';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from "ngx-spinner";


import { HeaderStyleOneComponent } from './header-style-one/header-style-one.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesStyleOneComponent } from './categories-style-one/categories-style-one.component';
import { HomePageOneComponent } from './home-page-one/home-page-one.component';
// import { HomeoneMainBannerComponent } from './homeone-main-banner/homeone-main-banner.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PagesComponent } from './pages.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { BecomeInstructorPartnerComponent } from './become-instructor-partner/become-instructor-partner.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MyWhishlistComponent } from './my-whishlist/my-whishlist.component';
import { InstructorDetailsComponent } from './instructor-details/instructor-details.component';
import { CoursesListSubcategoryComponent } from './courses-list-subcategory/courses-list-subcategory.component';
import { MyLearningsListComponent } from './my-learnings-list/my-learnings-list.component';
import { MessagesComponent } from './messages/messages.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxStarsModule } from 'ngx-stars';

@NgModule({
    imports: [NgxSpinnerModule,NgxStarsModule,AutocompleteLibModule,NgxStarRatingModule, NgxPaginationModule, CarouselModule, TabsModule, PageRoutingModule, FormsModule, ReactiveFormsModule, NgxScrollTopModule, WebcamModule, CommonModule],
    declarations: [
        RegisterPageComponent, LoginPageComponent, BecomeInstructorPartnerComponent,
        PagesComponent, CategoriesStyleOneComponent,
        HeaderStyleOneComponent, CoursesListComponent,
        FooterComponent, HomePageOneComponent, PasswordStrengthComponent, CartPageComponent, CheckoutPageComponent, CourseDetailsComponent, AuthorListComponent, MyWhishlistComponent, InstructorDetailsComponent, CoursesListSubcategoryComponent, MyLearningsListComponent, MessagesComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ]


})

export class PageModule { }
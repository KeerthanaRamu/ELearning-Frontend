import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/services/instructor.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartInfo;
  totalPrice = 0;
  constructor(private authService:AuthService,private instructorService: InstructorService, private router: Router) { }


  ngOnInit(): void {
    if (sessionStorage.authToken) {
      this.instructorService.getAddToCartDetails(sessionStorage.authToken)
        .subscribe(res => {
          this.cartInfo = res;
          for (let i = 0; i < this.cartInfo.length; i++) {
            this.totalPrice = this.totalPrice + this.cartInfo[i].course_price;
          }
          console.log("this.cartInfo====", this.cartInfo);

        })
    } else {
      // this.instructorService.getCartInfo()
      // .subscribe(res=>{

      //   console.log("====getCartInfo=",typeof res);
      //   this.cartInfo=res;

      // })
    }
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }


  removeFromCart(cartDt) {
    this.instructorService.removeFromCartDetails(sessionStorage.authToken, cartDt)
      .subscribe(res => {
        this.authService.isUserLoggedIn.next(true);
        this.instructorService.getAddToCartDetails(sessionStorage.authToken)
          .subscribe(res => {
            this.totalPrice = 0;
            this.cartInfo = res;
            for (let i = 0; i < this.cartInfo.length; i++) {
              this.totalPrice = this.totalPrice + this.cartInfo[i].course_price;
            }
            console.log("this.cartInfo====", this.cartInfo);
          })
      })
  }


}

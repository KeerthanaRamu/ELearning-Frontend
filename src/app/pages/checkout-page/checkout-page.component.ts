import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/services/instructor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  checkOutInfo;
  totalPrice = 0;
  handler: any;
  constructor(private instructorService: InstructorService, private router: Router) { }

  ngOnInit(): void {
    this.loadStripe()
    this.instructorService.getAddToCartDetails(sessionStorage.authToken)
      .subscribe(res => {
        this.checkOutInfo = res;
        for (let i = 0; i < this.checkOutInfo.length; i++) {
          this.totalPrice = this.totalPrice + this.checkOutInfo[i].course_price;
        }
        console.log("this.cartInfo====", this.checkOutInfo);
      })
  }

  setCheckOutDetails() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
      locale: 'auto',
      token: (token: any) => {
        this.instructorService.setCheckOutDetails(sessionStorage.authToken, this.checkOutInfo)
          .subscribe(res => {
            this.checkOutInfo = res;
            this.router.navigate(['/my-learnings-list']);
            console.log("this.cartInfo====", this.checkOutInfo);
          });
      }
    })
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: this.checkOutInfo.totalPrice * 100
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }


}

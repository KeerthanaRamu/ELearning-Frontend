import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { InstructorService } from 'src/services/instructor.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
	selector: 'app-categories-style-one',
	templateUrl: './categories-style-one.component.html',
	styleUrls: ['./categories-style-one.component.scss']
})
export class CategoriesStyleOneComponent implements OnInit {

	categoryList;
	constructor(private instructorService: InstructorService, private router: Router) { }

	ngOnInit(): void {

		this.instructorService.getCategoryList()
			.subscribe(res => {
				this.categoryList = res;
			})
	}

	categoriesSlides: OwlOptions = {
		loop: true,
		nav: true,
		dots: false,
		autoplayHoverPause: true,
		autoplay: true,
		margin: 30,
		navText: [
			"<i class='bx bx-left-arrow-alt'></i>",
			"<i class='bx bx-right-arrow-alt'></i>"
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	}

	getCoursesPerCategory(catDt) {
		let navigationExtras: NavigationExtras = {
			// skipLocationChange: true,
			queryParams: {
				"catId": JSON.stringify(catDt.id),
			}
		}
		this.router.navigate(['/courses-list'], navigationExtras);
	}

}
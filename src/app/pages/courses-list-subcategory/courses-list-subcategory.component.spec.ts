import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListSubcategoryComponent } from './courses-list-subcategory.component';

describe('CoursesListSubcategoryComponent', () => {
  let component: CoursesListSubcategoryComponent;
  let fixture: ComponentFixture<CoursesListSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesListSubcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

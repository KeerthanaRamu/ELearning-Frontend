import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWhishlistComponent } from './my-whishlist.component';

describe('MyWhishlistComponent', () => {
  let component: MyWhishlistComponent;
  let fixture: ComponentFixture<MyWhishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyWhishlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWhishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

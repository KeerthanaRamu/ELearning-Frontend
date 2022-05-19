import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLearningsOverviewComponent } from './my-learnings-overview.component';

describe('MyLearningsOverviewComponent', () => {
  let component: MyLearningsOverviewComponent;
  let fixture: ComponentFixture<MyLearningsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLearningsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLearningsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

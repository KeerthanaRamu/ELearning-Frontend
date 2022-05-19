import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLearningsListComponent } from './my-learnings-list.component';

describe('MyLearningsListComponent', () => {
  let component: MyLearningsListComponent;
  let fixture: ComponentFixture<MyLearningsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLearningsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLearningsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

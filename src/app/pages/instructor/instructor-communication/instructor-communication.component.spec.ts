import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCommunicationComponent } from './instructor-communication.component';

describe('InstructorCommunicationComponent', () => {
  let component: InstructorCommunicationComponent;
  let fixture: ComponentFixture<InstructorCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorCommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

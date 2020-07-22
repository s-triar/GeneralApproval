import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalConfirmationComponent } from './approval-confirmation.component';

describe('ApprovalConfirmationComponent', () => {
  let component: ApprovalConfirmationComponent;
  let fixture: ComponentFixture<ApprovalConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalWarningComponent } from './approval-warning.component';

describe('ApprovalWarningComponent', () => {
  let component: ApprovalWarningComponent;
  let fixture: ComponentFixture<ApprovalWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

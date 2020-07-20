import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextBoxComponent } from './form-text-box.component';

describe('FormTextBoxComponent', () => {
  let component: FormTextBoxComponent;
  let fixture: ComponentFixture<FormTextBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTextBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

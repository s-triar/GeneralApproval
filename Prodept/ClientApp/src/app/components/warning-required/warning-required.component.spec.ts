import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningRequiredComponent } from './warning-required.component';

describe('WarningRequiredComponent', () => {
  let component: WarningRequiredComponent;
  let fixture: ComponentFixture<WarningRequiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningRequiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

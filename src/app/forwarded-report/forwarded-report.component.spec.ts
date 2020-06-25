import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardedReportComponent } from './forwarded-report.component';

describe('ForwardedReportComponent', () => {
  let component: ForwardedReportComponent;
  let fixture: ComponentFixture<ForwardedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

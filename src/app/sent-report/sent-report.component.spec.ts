import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentReportComponent } from './sent-report.component';

describe('SentReportComponent', () => {
  let component: SentReportComponent;
  let fixture: ComponentFixture<SentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

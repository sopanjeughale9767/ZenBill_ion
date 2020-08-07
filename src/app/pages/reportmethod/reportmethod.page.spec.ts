import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportmethodPage } from './reportmethod.page';

describe('ReportmethodPage', () => {
  let component: ReportmethodPage;
  let fixture: ComponentFixture<ReportmethodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportmethodPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportmethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

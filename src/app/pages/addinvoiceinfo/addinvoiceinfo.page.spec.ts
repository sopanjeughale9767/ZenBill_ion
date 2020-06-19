import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinvoiceinfoPage } from './addinvoiceinfo.page';

describe('AddinvoiceinfoPage', () => {
  let component: AddinvoiceinfoPage;
  let fixture: ComponentFixture<AddinvoiceinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinvoiceinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinvoiceinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

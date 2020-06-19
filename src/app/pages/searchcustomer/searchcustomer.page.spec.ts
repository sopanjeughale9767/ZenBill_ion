import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcustomerPage } from './searchcustomer.page';

describe('SearchcustomerPage', () => {
  let component: SearchcustomerPage;
  let fixture: ComponentFixture<SearchcustomerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchcustomerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

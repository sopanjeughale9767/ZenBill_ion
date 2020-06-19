import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcustomerPage } from './addnewcustomer.page';

describe('AddnewcustomerPage', () => {
  let component: AddnewcustomerPage;
  let fixture: ComponentFixture<AddnewcustomerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewcustomerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewcustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

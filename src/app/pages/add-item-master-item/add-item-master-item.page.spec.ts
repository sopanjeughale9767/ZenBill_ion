import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemMasterItemPage } from './add-item-master-item.page';

describe('AddItemMasterItemPage', () => {
  let component: AddItemMasterItemPage;
  let fixture: ComponentFixture<AddItemMasterItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemMasterItemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemMasterItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

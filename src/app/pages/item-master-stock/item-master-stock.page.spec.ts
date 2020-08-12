import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterStockPage } from './item-master-stock.page';

describe('ItemMasterStockPage', () => {
  let component: ItemMasterStockPage;
  let fixture: ComponentFixture<ItemMasterStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMasterStockPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemmasterPage } from './itemmaster.page';

describe('ItemmasterPage', () => {
  let component: ItemmasterPage;
  let fixture: ComponentFixture<ItemmasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemmasterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemmasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

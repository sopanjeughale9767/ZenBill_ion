import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchitemPage } from './searchitem.page';

describe('SearchitemPage', () => {
  let component: SearchitemPage;
  let fixture: ComponentFixture<SearchitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchitemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

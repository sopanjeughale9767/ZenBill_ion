import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template1Page } from './template1.page';

describe('Template1Page', () => {
  let component: Template1Page;
  let fixture: ComponentFixture<Template1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

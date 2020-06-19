import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template2Page } from './template2.page';

describe('Template2Page', () => {
  let component: Template2Page;
  let fixture: ComponentFixture<Template2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

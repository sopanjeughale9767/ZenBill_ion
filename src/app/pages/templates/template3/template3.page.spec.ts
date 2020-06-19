import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Template3Page } from './template3.page';

describe('Template3Page', () => {
  let component: Template3Page;
  let fixture: ComponentFixture<Template3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcustomermodalComponent } from './addcustomermodal.component';

describe('AddcustomermodalComponent', () => {
  let component: AddcustomermodalComponent;
  let fixture: ComponentFixture<AddcustomermodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcustomermodalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcustomermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

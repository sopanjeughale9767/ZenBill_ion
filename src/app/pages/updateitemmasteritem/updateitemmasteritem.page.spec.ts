import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateitemmasteritemPage } from './updateitemmasteritem.page';

describe('UpdateitemmasteritemPage', () => {
  let component: UpdateitemmasteritemPage;
  let fixture: ComponentFixture<UpdateitemmasteritemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateitemmasteritemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateitemmasteritemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

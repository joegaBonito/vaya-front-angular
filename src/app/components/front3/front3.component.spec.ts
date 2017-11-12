import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Front3Component } from './front3.component';

describe('Front3Component', () => {
  let component: Front3Component;
  let fixture: ComponentFixture<Front3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Front3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Front3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

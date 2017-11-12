import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Front2Component } from './front2.component';

describe('Front2Component', () => {
  let component: Front2Component;
  let fixture: ComponentFixture<Front2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Front2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Front2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

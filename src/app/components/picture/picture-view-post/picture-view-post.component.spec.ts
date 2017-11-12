import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureViewPostComponent } from './picture-view-post.component';

describe('PictureViewPostComponent', () => {
  let component: PictureViewPostComponent;
  let fixture: ComponentFixture<PictureViewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureViewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

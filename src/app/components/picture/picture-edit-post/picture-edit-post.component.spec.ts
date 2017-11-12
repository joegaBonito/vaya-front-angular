import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureEditPostComponent } from './picture-edit-post.component';

describe('PictureEditPostComponent', () => {
  let component: PictureEditPostComponent;
  let fixture: ComponentFixture<PictureEditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureEditPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

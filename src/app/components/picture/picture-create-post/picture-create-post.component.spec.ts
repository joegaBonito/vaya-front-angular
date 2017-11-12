import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCreatePostComponent } from './picture-create-post.component';

describe('PictureCreatePostComponent', () => {
  let component: PictureCreatePostComponent;
  let fixture: ComponentFixture<PictureCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureCreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

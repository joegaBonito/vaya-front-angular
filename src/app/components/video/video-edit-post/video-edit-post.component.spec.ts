import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEditPostComponent } from './video-edit-post.component';

describe('VideoEditPostComponent', () => {
  let component: VideoEditPostComponent;
  let fixture: ComponentFixture<VideoEditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoEditPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

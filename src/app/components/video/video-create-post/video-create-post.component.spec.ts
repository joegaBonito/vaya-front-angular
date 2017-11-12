import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCreatePostComponent } from './video-create-post.component';

describe('VideoCreatePostComponent', () => {
  let component: VideoCreatePostComponent;
  let fixture: ComponentFixture<VideoCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

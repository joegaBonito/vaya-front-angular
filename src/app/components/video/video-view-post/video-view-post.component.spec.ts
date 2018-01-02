import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';
import { VideoViewPostComponent } from './video-view-post.component';

describe('VideoViewPostComponent', () => {
  let component: VideoViewPostComponent;
  let fixture: ComponentFixture<VideoViewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoViewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

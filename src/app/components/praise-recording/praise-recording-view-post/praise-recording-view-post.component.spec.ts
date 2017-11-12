import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraiseRecordingViewPostComponent } from './praise-recording-view-post.component';

describe('PraiseRecordingViewPostComponent', () => {
  let component: PraiseRecordingViewPostComponent;
  let fixture: ComponentFixture<PraiseRecordingViewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraiseRecordingViewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraiseRecordingViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

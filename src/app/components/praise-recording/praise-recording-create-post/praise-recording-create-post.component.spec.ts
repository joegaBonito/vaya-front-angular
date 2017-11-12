import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraiseRecordingCreatePostComponent } from './praise-recording-create-post.component';

describe('PraiseRecordingCreatePostComponent', () => {
  let component: PraiseRecordingCreatePostComponent;
  let fixture: ComponentFixture<PraiseRecordingCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraiseRecordingCreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraiseRecordingCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

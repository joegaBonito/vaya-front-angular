import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraiseRecordingEditPostComponent } from './praise-recording-edit-post.component';

describe('PraiseRecordingEditPostComponent', () => {
  let component: PraiseRecordingEditPostComponent;
  let fixture: ComponentFixture<PraiseRecordingEditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraiseRecordingEditPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraiseRecordingEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

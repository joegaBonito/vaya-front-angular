import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PraiseRecordingListComponent } from './praise-recording-list.component';

describe('PraiseRecordingListComponent', () => {
  let component: PraiseRecordingListComponent;
  let fixture: ComponentFixture<PraiseRecordingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PraiseRecordingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PraiseRecordingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

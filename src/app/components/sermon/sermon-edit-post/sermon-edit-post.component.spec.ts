import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonEditPostComponent } from './sermon-edit-post.component';

describe('SermonEditPostComponent', () => {
  let component: SermonEditPostComponent;
  let fixture: ComponentFixture<SermonEditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonEditPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

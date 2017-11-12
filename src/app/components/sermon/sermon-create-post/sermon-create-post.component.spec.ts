import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonCreatePostComponent } from './sermon-create-post.component';

describe('SermonCreatePostComponent', () => {
  let component: SermonCreatePostComponent;
  let fixture: ComponentFixture<SermonCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonCreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

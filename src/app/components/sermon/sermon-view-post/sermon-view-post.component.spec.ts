import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonViewPostComponent } from './sermon-view-post.component';

describe('SermonViewPostComponent', () => {
  let component: SermonViewPostComponent;
  let fixture: ComponentFixture<SermonViewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonViewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

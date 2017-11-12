import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungAdultsColumnEditPostComponent } from './young-adults-column-edit-post.component';

describe('YoungAdultsColumnEditPostComponent', () => {
  let component: YoungAdultsColumnEditPostComponent;
  let fixture: ComponentFixture<YoungAdultsColumnEditPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoungAdultsColumnEditPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungAdultsColumnEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

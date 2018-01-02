import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';
import { YoungAdultsColumnCreatePostComponent } from './young-adults-column-create-post.component';

describe('YoungAdultsColumnCreatePostComponent', () => {
  let component: YoungAdultsColumnCreatePostComponent;
  let fixture: ComponentFixture<YoungAdultsColumnCreatePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoungAdultsColumnCreatePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungAdultsColumnCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

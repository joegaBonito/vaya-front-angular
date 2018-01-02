import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';
import { YoungAdultsColumnViewPostComponent } from './young-adults-column-view-post.component';

describe('YoungAdultsColumnViewPostComponent', () => {
  let component: YoungAdultsColumnViewPostComponent;
  let fixture: ComponentFixture<YoungAdultsColumnViewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoungAdultsColumnViewPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungAdultsColumnViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

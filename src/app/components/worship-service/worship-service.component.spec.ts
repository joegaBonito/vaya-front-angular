import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';
import { WorshipServiceComponent } from './worship-service.component';

describe('WorshipServiceComponent', () => {
  let component: WorshipServiceComponent;
  let fixture: ComponentFixture<WorshipServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorshipServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorshipServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

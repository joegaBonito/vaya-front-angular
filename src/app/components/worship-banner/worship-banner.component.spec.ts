import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';
import { WorshipBannerComponent } from './worship-banner.component';

describe('WorshipBannerComponent', () => {
  let component: WorshipBannerComponent;
  let fixture: ComponentFixture<WorshipBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorshipBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorshipBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

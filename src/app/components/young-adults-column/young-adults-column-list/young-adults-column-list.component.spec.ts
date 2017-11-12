import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungAdultsColumnListComponent } from './young-adults-column-list.component';

describe('YoungAdultsColumnListComponent', () => {
  let component: YoungAdultsColumnListComponent;
  let fixture: ComponentFixture<YoungAdultsColumnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoungAdultsColumnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungAdultsColumnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

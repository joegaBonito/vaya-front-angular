import { TestBed, async, inject } from '@angular/core/testing';

import { GnbStatusGuard } from './gnb-status.guard';

describe('GnbStatusGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GnbStatusGuard]
    });
  });

  it('should ...', inject([GnbStatusGuard], (guard: GnbStatusGuard) => {
    expect(guard).toBeTruthy();
  }));
});

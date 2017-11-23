import { TestBed, inject } from '@angular/core/testing';

import { PraiserecordingService } from './praiserecording.service';

describe('PraiserecordingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PraiserecordingService]
    });
  });

  it('should be created', inject([PraiserecordingService], (service: PraiserecordingService) => {
    expect(service).toBeTruthy();
  }));
});

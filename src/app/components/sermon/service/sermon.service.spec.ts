import { TestBed, inject } from '@angular/core/testing';
import 'jasmine';
import { SermonService } from './sermon.service';

describe('SermonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SermonService]
    });
  });

  it('should be created', inject([SermonService], (service: SermonService) => {
    expect(service).toBeTruthy();
  }));
});

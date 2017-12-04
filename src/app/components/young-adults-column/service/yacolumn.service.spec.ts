import { TestBed, inject } from '@angular/core/testing';

import { YacolumnService } from './yacolumn.service';

describe('YacolumnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YacolumnService]
    });
  });

  it('should be created', inject([YacolumnService], (service: YacolumnService) => {
    expect(service).toBeTruthy();
  }));
});

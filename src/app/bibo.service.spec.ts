import { TestBed } from '@angular/core/testing';

import { BiboService } from './bibo.service';

describe('BiboService', () => {
  let service: BiboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

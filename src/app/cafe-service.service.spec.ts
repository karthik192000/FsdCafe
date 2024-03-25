import { TestBed } from '@angular/core/testing';

import { CafeServiceService } from './cafe-service.service';

describe('CafeServiceService', () => {
  let service: CafeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CafeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

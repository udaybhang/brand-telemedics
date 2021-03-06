import { TestBed } from '@angular/core/testing';

import { PractionerService } from './practioner.service';

describe('PractionerService', () => {
  let service: PractionerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PractionerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

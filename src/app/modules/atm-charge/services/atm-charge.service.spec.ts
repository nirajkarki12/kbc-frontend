import { TestBed } from '@angular/core/testing';

import { AtmChargeService } from './atm-charge.service';

describe('AtmChargeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtmChargeService = TestBed.get(AtmChargeService);
    expect(service).toBeTruthy();
  });
});

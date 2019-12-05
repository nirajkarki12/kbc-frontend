import { TestBed } from '@angular/core/testing';

import { AtmChargeDataResolverService } from './atm-charge-data-resolver.service';

describe('AtmChargeDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtmChargeDataResolverService = TestBed.get(AtmChargeDataResolverService);
    expect(service).toBeTruthy();
  });
});

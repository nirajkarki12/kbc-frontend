import { TestBed } from '@angular/core/testing';

import { BankDataResolverService } from './bank-data-resolver.service';

describe('BankDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankDataResolverService = TestBed.get(BankDataResolverService);
    expect(service).toBeTruthy();
  });
});

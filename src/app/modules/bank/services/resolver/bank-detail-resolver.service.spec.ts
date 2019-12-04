import { TestBed } from '@angular/core/testing';

import { BankDetailResolverService } from './bank-detail-resolver.service';

describe('BankDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankDetailResolverService = TestBed.get(BankDetailResolverService);
    expect(service).toBeTruthy();
  });
});

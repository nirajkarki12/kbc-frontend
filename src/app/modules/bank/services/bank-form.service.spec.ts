import { TestBed } from '@angular/core/testing';

import { BankFormService } from './bank-form.service';

describe('BankFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankFormService = TestBed.get(BankFormService);
    expect(service).toBeTruthy();
  });
});

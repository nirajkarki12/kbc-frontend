import { TestBed } from '@angular/core/testing';

import { AtmChargeFormService } from './atm-charge-form.service';

describe('AtmChargeFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtmChargeFormService = TestBed.get(AtmChargeFormService);
    expect(service).toBeTruthy();
  });
});

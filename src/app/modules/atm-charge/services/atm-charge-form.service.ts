import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
// Models
import { ATMCharge } from '../models/atm-charge.model';

@Injectable({
  providedIn: 'root'
})
export class AtmChargeFormService {

  constructor(
    private fb: FormBuilder
  ) { }

  createForm(atmCharge: ATMCharge) {
    return this.fb.group({
      bank_from: [atmCharge.bank_from, [Validators.required]],
      bank_to: [atmCharge.bank_to, [Validators.required]],
      network: [atmCharge.network, [Validators.required]],
      charge: [atmCharge.charge, [Validators.required, CustomValidators.gte(10), CustomValidators.lte(1000)]],
      note: [atmCharge.note, [Validators.minLength(2), Validators.maxLength(255)]],
    });
  }
}

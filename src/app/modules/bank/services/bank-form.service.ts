import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

// Models
import { Bank } from '../models/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankFormService {

  constructor(
    private fb: FormBuilder,
  ) { }

  createForm(bank: Bank) {
    return this.fb.group({
        id: [bank.id],
        name: [bank.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        abbre: [bank.abbre, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        logo: [bank.logo, [Validators.required]],
      });
  }
}

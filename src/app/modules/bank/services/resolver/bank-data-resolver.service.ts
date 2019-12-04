import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { AppRoutes } from 'src/app/constants/app-routes';
import { BankService } from '../bank.service';

@Injectable({
  providedIn: 'root'
})
export class BankDataResolverService {

  constructor(
    private bankService: BankService,
    private toastr: ValidatorMessageService,
    private router: Router
  ) { }

  resolve() {
    return this.bankService.bankList()
      .catch((err) => {
        this.toastr.showMessage(err.error.message, 'error');
        this.router.navigate([AppRoutes.bank + '/' + AppRoutes.list]);
      });
  }
}

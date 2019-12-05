import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';
import { Bank } from '../models/bank.model';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  banks: Bank[];
  loading = true;

  constructor(
    private bankService: BankService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.fetchBank();
  }

  fetchBank() {
    this.loading = true;
    this.bankService
      .bankList()
      .then(successResponse => {
        this.loading = false;
        this.banks = successResponse.data;
      })
      .catch(errorResponse => {
        console.log(errorResponse);
      });
  }

  removeBank(bank: Bank) {
    if (confirm('Are you sure to delete ' + bank.name + '\'s Bank')) {
      this.bankService
        .removeBank(bank.id)
        .then(successResponse => {
          this.toastr.showMessage('Bank deleted Successfully');
          this.fetchBank();
        })
        .catch(errorResponse => {
          this.toastr.showMessage(errorResponse, 'error');
        });
    }
  }

}

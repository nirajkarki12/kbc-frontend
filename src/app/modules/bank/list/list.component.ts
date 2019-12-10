import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';
import { Bank } from '../models/bank.model';
import { Paginate } from 'src/app/modules/shared/models/paginate.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  banks: Bank[];
  paginate: Paginate = new Paginate();
  loading = true;
  event: PageChangedEvent;

  constructor(
    private bankService: BankService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.fetchBanks();
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

  fetchBanks(pageNo = 1) {
    this.loading = true;
    this.bankService
      .banksList(pageNo)
      .then(successResponse => {
        this.loading = false;
        this.paginate = successResponse.data;
        this.banks = this.paginate.data;
        console.log(this.paginate.data);
        if (this.banks.length === 0 && this.paginate.current_page > 1) {
          this.fetchBanks();
        }
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

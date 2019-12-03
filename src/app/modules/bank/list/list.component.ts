import { Component, OnInit } from '@angular/core';
import { BankService } from '../services/bank.service';
import { Bank } from '../models/bank.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  banks: Bank[];

  constructor(
    private bankService: BankService,
  ) { }

  ngOnInit() {
    this.fetchBank();
    console.log(this.banks);
  }

  fetchBank() {
    this.bankService
      .bankList()
      .then(successResponse => {
        this.banks = successResponse.data;
      })
      .catch(errorResponse => {
        console.log(errorResponse);
      });
  }

  removeBank(bank: Bank) {
    if (confirm('Are you sure to delete ' + bank.name + '\'s Bank')) {
      console.log(bank);
      this.bankService
        .removeBank(bank.id)
        .then(successResponse => {
          this.fetchBank();
        })
        .catch(errorResponse => {

        });
    }
  }

}

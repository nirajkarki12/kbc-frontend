import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Models
import { Bank } from '../models/bank.model';

@Component({
  selector: 'app-transaction-charge',
  templateUrl: './transaction-charge.component.html',
  styleUrls: ['./transaction-charge.component.scss']
})
export class TransactionChargeComponent implements OnInit {
  banks: Bank[];

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.banks = data.banks.data;
        console.log(this.banks);
      });
  }

}

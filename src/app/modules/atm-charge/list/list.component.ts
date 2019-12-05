import { Component, OnInit } from '@angular/core';
// Services
import { AtmChargeService } from '../services/atm-charge.service';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
// Models
import { ATMCharge } from '../models/atm-charge.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  atmCharge: ATMCharge[];
  loading = true;

  constructor(
    private atmChargeService: AtmChargeService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.fetchAtmCharge();
    console.log(this.atmCharge);
  }

  fetchAtmCharge() {
    this.loading = true;
    this.atmChargeService
      .atmChargeList()
      .then(successResponse => {
        this.loading = false;
        this.atmCharge = successResponse.data;
      })
      .catch(errorResponse => {
        console.log(errorResponse);
      });
  }

  removeAtmCharge(atmCharge: ATMCharge) {
    if (confirm('Are you sure to delete ' + atmCharge.name + '\'s Charge Record')) {
      this.atmChargeService
        .removeAtmCharge(atmCharge.id)
        .then(successResponse => {
          this.toastr.showMessage('ATM Charge removed Successfully');
          this.fetchAtmCharge();
        })
        .catch(errorResponse => {
          this.toastr.showMessage(errorResponse, 'error');
        });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AppRoutes } from 'src/app/constants/app-routes';
// Services
import { AtmChargeFormService } from '../services/atm-charge-form.service';
import { AtmChargeService } from '../services/atm-charge.service';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
// Models
import { Bank } from 'src/app/modules/bank/models/bank.model';
import { ATMCharge } from '../models/atm-charge.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  atmCharge: ATMCharge = new ATMCharge();
  banks: Bank[];
  atmForm: FormGroup;
  buttonClicked: Boolean = false;
  bankFromSettings = {
    singleSelection: true,
    text: 'Select Banks',
    enableSearchFilter: true,
    labelKey: 'name',
  };
  bankToSettings = {
    singleSelection: false,
    text: 'Select Banks',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    labelKey: 'name',
  };
  networkSettings = {
    singleSelection: false,
    text: 'Select Networks',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    labelKey: 'name',
    primaryKey: 'name'
  };
  networks: Array<any> = [
    { name: 'SCT'},
    { name: 'NEPS'},
    { name: 'VISA'},
    { name: 'NPN'},
  ];
  selectFromBank: Array<any> = [];
  selectNetwork: Array<any> = [];
  selectToBank: Array<any> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private atmChargeFormService: AtmChargeFormService,
    private atmChargeService: AtmChargeService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.banks = data.banks.data;

        this.atmForm = this.atmChargeFormService.createForm(this.atmCharge);
      });
  }

  OnItemDeSelect(item: any, field: any) {
    switch (field) {
      case 'selectFromBank':
      this.selectFromBank = [];
      break;
      case 'selectNetwork':
      this.selectNetwork = [];
      break;
      case 'selectToBank':
      this.selectToBank = [];
      break;
    }
  }

  create() {
    this.atmForm.patchValue({
      bank_from: this.selectFromBank.map(x => x.id)[0],
      network: this.selectNetwork.map(x => x.name),
      bank_to: this.selectToBank.map((x) => {
        return {id: x.id, name: x.name};
      })
    });
    this.buttonClicked = true;
    this.atmChargeService
      .create(this.atmForm.value)
      .then(response => {
        this.toastr.showMessage(response.body.message);
        this.router.navigate([AppRoutes.atmCharge + '/' + AppRoutes.list]);
      })
      .catch(errorResponse => {
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

}

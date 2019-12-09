import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  atmCharge: ATMCharge = new ATMCharge();
  banks: Bank[];
  atmForm: FormGroup;
  buttonClicked: Boolean = false;
  bankFromSettings = {
    singleSelection: true,
    disabled: true,
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
  returnPage: number = 1;
  sub: Subscription;

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
        console.log(data);
        this.banks = data.banks.data;
        this.atmCharge = data.atmCharge.data;
        console.log(this.banks);
        // Adding data to array
        this.selectFromBank.push(
          this.banks.find(x => {
            return x.id === this.atmCharge.bank_from;
          })
        );
        this.selectNetwork = this.atmCharge.network.map(x => {
          return {name: x};
        });
        this.selectToBank = this.atmCharge.bank_to.map(x => {
          return this.banks.find(y => y.id === x.id);
        });
        this.sub = this.route.queryParams.subscribe(params => {
          this.returnPage = params['returnPage'];
        });
        this.atmForm = this.atmChargeFormService.createForm(this.atmCharge);
      });
  }

  OnItemDeSelect(item: any, field: any) {
    console.log(item);
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

  update() {
    this.atmForm.patchValue({
      bank_from: this.selectFromBank.map(x => x.id)[0],
      network: this.selectNetwork.map(x => x.name),
      bank_to: this.selectToBank.map((x) => {
        return {id: x.id, name: x.name};
      })
    });
    this.buttonClicked = true;
    this.atmChargeService
      .update(this.atmForm.value)
      .then(response => {
        this.toastr.showMessage(response.body.message);
        this.router.navigate([AppRoutes.atmCharge + '/' + AppRoutes.list], { queryParams: { page: this.returnPage }});
      })
      .catch(errorResponse => {
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

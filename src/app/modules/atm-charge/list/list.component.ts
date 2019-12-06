import { Component, OnInit, OnDestroy } from '@angular/core';
// Services
import { AtmChargeService } from '../services/atm-charge.service';
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
// Models
import { ATMCharge } from '../models/atm-charge.model';
import { Paginate } from 'src/app/modules/shared/models/paginate.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  atmCharge: ATMCharge[];
  paginate: Paginate = new Paginate();
  loading = true;
  event: PageChangedEvent;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private atmChargeService: AtmChargeService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.paginate.current_page = params['page'] || 1;
      this.fetchAtmCharge(this.paginate.current_page);
    });
  }

  fetchAtmCharge(pageNo = 1) {
    this.loading = true;
    this.atmChargeService
      .atmChargeList(pageNo)
      .then(successResponse => {
        this.loading = false;
        this.paginate = successResponse.data;
        this.atmCharge = this.paginate.data;
        if (this.atmCharge.length === 0 && this.paginate.current_page > 1) {
          this.fetchAtmCharge();
        }
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
          this.fetchAtmCharge(this.paginate.current_page);
        })
        .catch(errorResponse => {
          this.toastr.showMessage(errorResponse, 'error');
        });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}

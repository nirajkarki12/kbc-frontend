import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { Subscription } from 'rxjs';
// Models
import { Paginate } from 'src/app/modules/shared/models/paginate.model';
import { SmsSearchParam } from '../models/SmsSearchParam.model';
import { Sms } from '../models/sms.model';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { SmsService } from '../services/sms.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sms: Sms[];
  paginate: Paginate = new Paginate();
  loading = true;
  event: PageChangedEvent;
  sub: Subscription;
  filterParam = new SmsSearchParam();
  delay = 500;
  config;
  isCollapsed: boolean = true;
  iconCollapse: string = 'icon-arrow-up';

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  constructor(
    private route: ActivatedRoute,
    public smsService: SmsService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.paginate.current_page = params['page'] || 1;
      this.fetchSmsList(this.paginate.current_page);
    });
  }

  fetchSmsList(pageNo = 1) {
    this.loading = true;
    this.smsService
      .smsList(pageNo, this.filterParam)
      .then(successResponse => {
        this.loading = false;
        this.paginate = successResponse.body.data;
        this.sms = this.paginate.data;
        if (this.sms.length === 0 && this.paginate.current_page > 1) {
          this.fetchSmsList();
        }
      })
      .catch(errorResponse => {
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

  resendSms() {
    if (confirm('Are you sure to re-schedule SMS?')) {
      this.loading = true;
      this.smsService
        .resendSms(this.filterParam)
        .then(successResponse => {
          this.loading = false;
          console.log(successResponse);
          this.resetFilterParam();
          this.toggleCollapse();
          this.toastr.showMessage('SMS schedule have been on for filtered record\'s', 'success');
        })
        .catch(errorResponse => {
          this.toastr.showMessage(errorResponse.error.message, 'error');
          console.log(errorResponse);
        });
    }
  }

  resetFilterParam() {
    this.filterParam = new SmsSearchParam();
    this.fetchSmsList();
  }

}

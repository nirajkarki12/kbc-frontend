import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiConstants } from 'src/app/constants/api-constants';
// Models
import { SmsSearchParam } from '../models/SmsSearchParam.model';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient) { }

  smsList(pageNo: Number, filterParam: SmsSearchParam): Promise<any> {
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.SMS +
      '?page=' + pageNo
      , filterParam ,
      { observe: 'response'} )
    .toPromise()
    .then(this.handleSuccess)
    .catch(this.handleError);
  }

  resendSms(filterParam: SmsSearchParam): Promise<any> {
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.SMS +
      ApiConstants.RESEND
      , filterParam ,
      { observe: 'response'} )
    .toPromise()
    .then(this.handleSuccess)
    .catch(this.handleError);
  }

  handleSuccess(response: any): Promise<any> {
    return Promise.resolve(response);
  }

  handleError(response: any): Promise<any> {
    return Promise.reject(response);
  }
}

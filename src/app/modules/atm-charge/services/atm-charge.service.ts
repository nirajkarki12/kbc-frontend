import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiConstants } from 'src/app/constants/api-constants';
// Models
import { ATMCharge } from '../models/atm-charge.model';
import { Paginate } from 'src/app/modules/shared/models/paginate.model';

@Injectable({
  providedIn: 'root'
})
export class AtmChargeService {

  constructor(private http: HttpClient) { }

  create(atmCharge: ATMCharge): Promise<any> {
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.ATM +
      ApiConstants.STORE
      , atmCharge,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  atmChargeList(pageNo: Number): Promise<any> {
    return this.http.get(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.ATM +
      '?page=' + pageNo
    )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  fetchAtmChargeDetail(id): Promise<any> {
    return this.http
      .get(
        ApiConstants.API_ENDPOINT +
        ApiConstants.ADMIN +
        ApiConstants.V1 +
        ApiConstants.ATM +
        ApiConstants.DETAIL + '/' +
        id
      )
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  update(atmCharge: ATMCharge): Promise<any> {
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.ATM +
      ApiConstants.UPDATE
      , atmCharge,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  removeAtmCharge(atmChargeId: any): Promise<any> {
    return this.http
      .delete(
        ApiConstants.API_ENDPOINT +
        ApiConstants.ADMIN +
        ApiConstants.V1 +
        ApiConstants.ATM +
        ApiConstants.DELETE + '/' +
        atmChargeId
      )
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiConstants } from 'src/app/constants/api-constants';
import { ATMCharge } from '../models/atm-charge.model';

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

  handleSuccess(response: any): Promise<any> {
    return Promise.resolve(response);

  }

  handleError(response: any): Promise<any> {
    return Promise.reject(response);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiConstants } from 'src/app/constants/api-constants';
import { Bank } from '../models/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  create(bankModel: Bank, logo: File = null): Promise<any> {
    const input = new FormData();
    input.append('name', bankModel.name);
    input.append('abbre', bankModel.abbre);
    if (logo) {
      input.append('logo', logo);
    }

    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.BANK +
      ApiConstants.STORE
      , input,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  update(bankId, bankModel: Bank, logo: File = null): Promise<any> {
    const input = new FormData();
    input.append('id', bankId);
    input.append('name', bankModel.name);
    input.append('abbre', bankModel.abbre);
    if (logo) {
      input.append('logo', logo);
    }
    return this.http.post(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.BANK +
      ApiConstants.UPDATE
      , input,
      { observe: 'response'} )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  bankList(): Promise<any> {
    return this.http.get(
      ApiConstants.API_ENDPOINT +
      ApiConstants.ADMIN +
      ApiConstants.V1 +
      ApiConstants.BANK
    )
     .toPromise()
     .then(this.handleSuccess)
     .catch(this.handleError);
  }

  fetchBankDetail(id): Promise<any> {
    return this.http
      .get(
        ApiConstants.API_ENDPOINT +
        ApiConstants.ADMIN +
        ApiConstants.V1 +
        ApiConstants.BANK +
        ApiConstants.DETAIL + '/' +
        id
      )
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  removeBank(bankId: any): Promise<any> {
    return this.http
      .delete(
        ApiConstants.API_ENDPOINT +
        ApiConstants.ADMIN +
        ApiConstants.V1 +
        ApiConstants.BANK +
        ApiConstants.DELETE + '/' +
        bankId
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

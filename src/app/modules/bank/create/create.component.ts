import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Services
import { ValidatorMessageService } from 'src/app/modules/shared/services/validator-message/validator-message.service';
import { BankFormService } from '../services/bank-form.service';
import { BankService } from '../services/bank.service';
// Models
import { Bank } from '../models/bank.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  bankForm: FormGroup;
  bank: Bank = new Bank();
  logo; File;
  buttonClicked = false;
  @ViewChild('fileInput', {static: false}) fileInput;

  constructor(
    private router: Router,
    private bankFormService: BankFormService,
    private bankService: BankService,
    private toastr: ValidatorMessageService
  ) { }

  ngOnInit() {
    this.bankForm = this.bankFormService.createForm(this.bank);
  }

  create() {
    this.buttonClicked = true;
    this.bankService
      .create(this.bankForm.value, this.logo)
      .then(response => {
        this.toastr.showMessage(response.body.message);
        this.router.navigate([AppRoutes.bank + '/' + AppRoutes.list]);
      })
      .catch(errorResponse => {
        console.log(errorResponse);
        this.buttonClicked = false;
        this.toastr.showMessage(errorResponse.error.message, 'error');
      });
  }

  uploadPicture() {
    const fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.logo = fileToUpload;
    }
  }

}

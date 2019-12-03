import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CustomFormsModule } from 'ngx-custom-validators';

import { NoRecordsFoundComponent } from './components/no-records-found/no-records-found.component';
import { LoadingComponent } from './components/loading/loading.component';
// Services
import { ValidatorMessageService } from './services/validator-message/validator-message.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CustomFormsModule,
  ],
  declarations: [
    NoRecordsFoundComponent,
    LoadingComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    RouterModule,
    NoRecordsFoundComponent,
    LoadingComponent,
  ],
  providers: [
    DatePipe,
    ValidatorMessageService
  ]
})
export class SharedModule { }

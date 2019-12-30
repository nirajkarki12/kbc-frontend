import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { SmsRoutingModule } from './sms-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    SharedModule,
    SmsRoutingModule
  ]
})
export class SmsModule { }

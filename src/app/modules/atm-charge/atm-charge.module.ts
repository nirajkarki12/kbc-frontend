import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { AtmChargeRoutingModule } from './atm-charge-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    SharedModule,
    AtmChargeRoutingModule
  ]
})
export class AtmChargeModule { }

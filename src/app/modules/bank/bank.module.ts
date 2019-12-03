import { NgModule } from '@angular/core';

import { BankRoutingModule } from './bank-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    SharedModule,
    BankRoutingModule
  ],
})
export class BankModule { }

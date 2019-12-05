import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
// Resolver
import { BankDataResolverService } from './services/resolver/bank-data-resolver.service';
import { AtmChargeDataResolverService } from './services/resolver/atm-charge-data-resolver.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ATM Charge'
    },
    children: [
      {
        path: AppRoutes.list,
        component: ListComponent,
        data: {
          title: 'List'
        },
      },
      {
        path: AppRoutes.create,
        component: CreateComponent,
        data: {
          title: 'Add new Record'
        },
        resolve: {
          'banks': BankDataResolverService,
        },
      },
      {
        path: AppRoutes.edit,
        component: EditComponent,
        data: {
          title: 'Edit Record'
        },
        resolve: {
          'banks': BankDataResolverService,
          'atmCharge': AtmChargeDataResolverService,
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtmChargeRoutingModule { }

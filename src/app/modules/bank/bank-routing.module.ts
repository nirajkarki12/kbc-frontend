import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
// Resolver
import { BankDetailResolverService } from './services/resolver/bank-detail-resolver.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bank'
    },
    children: [
      {
        path: AppRoutes.list,
        component: ListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: AppRoutes.create,
        component: CreateComponent,
        data: {
          title: 'Create Bank'
        }
      },
      {
        path: AppRoutes.edit,
        component: EditComponent,
        resolve: {
          'bank': BankDetailResolverService,
        },
        data: {
          title: 'Edit Bank'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }

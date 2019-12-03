import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/constants/app-routes';
// Components
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {
    path: AppRoutes.list,
    component: ListComponent,
    data: {
      title: 'Bank'
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
    data: {
      title: 'Edit Bank'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankRoutingModule { }

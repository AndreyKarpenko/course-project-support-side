import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CustomerComponent} from './customer.component';
import {DialogsComponent} from './dialogs/dialogs.component';
import {HomeComponent} from './home/home.component';
import {OperatorsComponent} from './operators/operators.component';

import {CustomerAuthGuardService} from './customer-auth-guard.service';
import {DialogsResolver} from './dialogs/dialogs-resolver.service';

const routes: Routes = [
  {
    path: 'customer',
    canActivate: [CustomerAuthGuardService],
    component: CustomerComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'dialogs',
        resolve: {
          dialogs: DialogsResolver
        },
        component: DialogsComponent
      },
      {
        path: 'dialogs/:id',
        loadChildren: 'app/customer/dialog-details/dialog-details.module#DialogDetailsModule'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'operators',
        component: OperatorsComponent
      },
      {
        path: 'operators/new',
        loadChildren: 'app/customer/new-operator/new-operator.module#NewOperatorModule'
      },
      {
        path: 'operators/:id',
        loadChildren: 'app/customer/operator-details/operator-details.module#OperatorDetailsModule'
      },
      {
        path: 'payment',
        loadChildren: 'app/customer/payment/payment.module#PaymentModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CustomerAuthGuardService,
    DialogsResolver
  ]
})
export class CustomerRoutingModule {
}

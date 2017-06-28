import {NgModule} from '@angular/core';
import {MdButtonModule, MdSidenavModule} from '@angular/material';

import {CustomerRoutingModule} from './customer-routing.module';
import {DialogsModule} from './dialogs/dialogs.module';
import {HomeModule} from './home/home.module';
import {OperatorsModule} from './operators/operators.module';

import {CustomerComponent} from './customer.component';
import {NavbarComponent} from './navbar/navbar.component';

@NgModule({
  declarations: [
    CustomerComponent,
    NavbarComponent
  ],
  imports: [
    MdButtonModule,
    MdSidenavModule,
    CustomerRoutingModule,
    DialogsModule,
    HomeModule,
    OperatorsModule
  ]
})
export class CustomerModule {
}

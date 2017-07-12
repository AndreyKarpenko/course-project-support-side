import {NgModule} from '@angular/core';
import {MdButtonModule, MdSidenavModule} from '@angular/material';

import {CustomerRoutingModule} from './customer-routing.module';
import {DialogsModule} from './dialogs/dialogs.module';
import {HomeModule} from './home/home.module';
import {OperatorsModule} from './operators/operators.module';

import {CustomerComponent} from './customer.component';
import {DesktopNavbarComponent} from './desktop-navbar/desktop-navbar.component';
import {MobileNavbarComponent} from './mobile-navbar/mobile-navbar.component';

@NgModule({
  declarations: [
    CustomerComponent,
    DesktopNavbarComponent,
    MobileNavbarComponent
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

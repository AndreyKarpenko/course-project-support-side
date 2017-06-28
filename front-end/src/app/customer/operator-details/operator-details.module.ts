import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {OperatorDetailsRoutingModule} from './operator-details-routing.module';

import {OperatorDetailsComponent} from './operator-details.component';

@NgModule({
  declarations: [OperatorDetailsComponent],
  imports: [
    CommonModule,
    OperatorDetailsRoutingModule
  ]
})
export class OperatorDetailsModule {
}

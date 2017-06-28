import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {DialogDetailsRoutingModule} from './dialog-details-routing.module';

import {DialogDetailsComponent} from './dialog-details.component';

@NgModule({
  declarations: [DialogDetailsComponent],
  imports: [
    CommonModule,
    DialogDetailsRoutingModule
  ]
})
export class DialogDetailsModule {
}

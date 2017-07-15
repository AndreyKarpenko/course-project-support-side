import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NewOperatorRoutingModule} from './new-operator-routing.module';

import {NewOperatorComponent} from './new-operator.component';

@NgModule({
  declarations: [NewOperatorComponent],
  imports: [
    CommonModule,
    NewOperatorRoutingModule,
    ReactiveFormsModule
  ]
})
export class NewOperatorModule {
}

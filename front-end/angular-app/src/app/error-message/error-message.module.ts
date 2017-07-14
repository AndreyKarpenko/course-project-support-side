import {NgModule} from '@angular/core';
import {MdButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {ErrorMessageRoutingModule} from './error-message-routing.module';

import {ErrorMessageComponent} from './error-message.component';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [
    MdButtonModule,
    RouterModule,
    ErrorMessageRoutingModule
  ]
})
export class ErrorMessageModule {
}

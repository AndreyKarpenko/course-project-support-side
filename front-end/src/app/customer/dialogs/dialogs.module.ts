import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MdCardModule} from '@angular/material';

import {DialogsComponent} from './dialogs.component';

@NgModule({
  declarations: [DialogsComponent],
  imports: [
    CommonModule,
    MdCardModule
  ]
})
export class DialogsModule {
}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MdCardModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {DialogsComponent} from './dialogs.component';

@NgModule({
  declarations: [DialogsComponent],
  imports: [
    CommonModule,
    MdCardModule,
    RouterModule
  ]
})
export class DialogsModule {
}

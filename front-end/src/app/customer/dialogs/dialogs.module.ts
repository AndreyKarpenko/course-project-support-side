import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MdCardModule, MdSelectModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {DialogsComponent} from './dialogs.component';

@NgModule({
  declarations: [DialogsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MdCardModule,
    MdSelectModule,
    RouterModule
  ]
})
export class DialogsModule {
}

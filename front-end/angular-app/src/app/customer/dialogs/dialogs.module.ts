import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdButtonModule, MdCardModule, MdProgressSpinnerModule,
        MdSelectModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {DialogsComponent} from './dialogs.component';

@NgModule({
  declarations: [DialogsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class DialogsModule {
}

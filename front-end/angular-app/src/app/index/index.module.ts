import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MdButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {SigninModule} from '../signin/signin.module';

import {IndexComponent} from './index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    MdButtonModule,
    RouterModule,
    SigninModule
  ]
})
export class IndexModule {
}

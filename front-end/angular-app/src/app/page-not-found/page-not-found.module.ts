import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MdButtonModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {PageNotFoundComponent} from './page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    MdButtonModule,
    RouterModule
  ]
})
export class PageNotFoundModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DialogDetailsComponent} from './dialog-details.component';

const routes: Routes = [
  {
    path: '',
    component: DialogDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogDetailsRoutingModule {
}

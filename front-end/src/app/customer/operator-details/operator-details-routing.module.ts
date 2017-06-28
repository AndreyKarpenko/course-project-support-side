import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OperatorDetailsComponent} from './operator-details.component';

const routes: Routes = [
  {
    path: '',
    component: OperatorDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorDetailsRoutingModule {
}

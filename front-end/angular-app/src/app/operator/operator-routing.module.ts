import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {OperatorsComponent} from './operator.component';

import {OperatorAuthGuardService} from './operator-auth-guard.service';

const routes: Routes = [
  {
    path: 'operator',
    canActivate: [OperatorAuthGuardService],
    component: OperatorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OperatorAuthGuardService]
})
export class OperatorRoutingModule {
}

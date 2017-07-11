import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IndexComponent} from './index/index.component';
import {OperatorsComponent} from './operator/operator.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SigninContainerComponent} from './signin/signin-container.component';
import {SignoutComponent} from './signout/signout.component';
import {SignupComponent} from './signup/signup.component';

import {AuthGuardService} from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'operator',
    canActivate: [AuthGuardService],
    component: OperatorsComponent
  },
  {
    path: 'signin',
    component: SigninContainerComponent
  },
  {
    path: 'signout',
    component: SignoutComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {
}

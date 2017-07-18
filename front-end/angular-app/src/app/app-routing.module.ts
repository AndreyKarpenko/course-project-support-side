import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IndexComponent} from './index/index.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SigninContainerComponent} from './signin/signin-container.component';
import {SignoutComponent} from './signout/signout.component';
import {SignupComponent} from './signup/signup.component';

import {SignoutAuthGuardService} from './signout/signout-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'signin',
    component: SigninContainerComponent
  },
  {
    path: 'signout',
    canActivate: [SignoutAuthGuardService],
    component: SignoutComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'error-message',
    loadChildren: 'app/error-message/error-message.module#ErrorMessageModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SignoutAuthGuardService]
})
export class AppRoutingModule {
}

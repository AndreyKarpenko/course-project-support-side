import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SigninComponent} from './signin.component';
import {SigninContainerComponent} from './signin-container.component';

@NgModule({
  declarations: [
    SigninComponent,
    SigninContainerComponent
  ],
  imports: [RouterModule],
  exports: [SigninComponent]
})
export class SigninModule {
}

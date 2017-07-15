import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {MdButtonModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';

import 'hammerjs';

import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {CustomerModule} from './customer/customer.module';
import {IndexModule} from './index/index.module';
import {OperatorsModule} from './operator/operator.module';
//import {NewOperatorModule} from './customer/new-operator/new-operator.module'
import {PageNotFoundModule} from './page-not-found/page-not-found.module';
import {SigninModule} from './signin/signin.module';
import {SignoutModule} from './signout/signout.module';
import {SignupModule} from './signup/signup.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MdButtonModule,
    CoreModule,
    CustomerModule,
    IndexModule,
    OperatorsModule,
    //NewOperatorModule,
    PageNotFoundModule,
    SigninModule,
    SignoutModule,
    SignupModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

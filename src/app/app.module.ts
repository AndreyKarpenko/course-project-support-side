import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MdInputModule} from '@angular/material';

import 'hammerjs';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MdInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

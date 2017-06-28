import {NgModule} from '@angular/core';

import {ApiService} from './api.service';
import {StorageService} from './storage.service';

@NgModule({
  providers: [
    ApiService,
    StorageService
  ]
})
export class CoreModule {
}

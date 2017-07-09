import {NgModule} from '@angular/core';
import {HttpModule}    from '@angular/http';

import {ApiService} from './api.service';
import {StorageService} from './storage.service';

@NgModule({
  imports: [HttpModule],
  providers: [
    ApiService,
    StorageService
  ]
})
export class CoreModule {
}

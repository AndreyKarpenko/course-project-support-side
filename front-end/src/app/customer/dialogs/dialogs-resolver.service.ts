import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';

import {ApiService} from '../../core/api.service';
import {StorageService} from '../../core/storage.service';

@Injectable()
export class DialogsResolver implements Resolve<any> {
  constructor(
    private Api: ApiService,
    private storage: StorageService
  ) {}

  resolve(): any {
    if (this.storage.customerInfo.dialogs) return true;

    return this.Api.getDialogs()
      .then((dialogs) => {
        this.storage.customerInfo.dialogs = dialogs;
        return true;
      })
      .catch((err) => {
        console.log(err);
        return true;
      });
  }
}

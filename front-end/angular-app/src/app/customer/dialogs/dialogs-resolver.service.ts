import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';

import {ApiService} from '../../core/api.service';

@Injectable()
export class DialogsResolver implements Resolve<any> {
  constructor(
    private Api: ApiService,
    private router: Router
  ) {}

  resolve(): any {
    return this.Api.getDialogs()
      .then((dialogs) => {
        return dialogs;
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error-message']);
      });
  }
}

import {Injectable} from '@angular/core';
// import {Resolve, Router} from '@angular/router';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import {ApiService} from '../../core/api.service';

@Injectable()
export class DialogResolver implements Resolve<any> {
  constructor(
    private Api: ApiService,
    private router: Router
  ) {}

  resolve(route:ActivatedRouteSnapshot): any {
    let id = route.paramMap.get('id');
    return this.Api.getDialog(id)
      .then((dialog) => {
        console.log(dialog);
        return dialog;
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error-message']);
      });
  }
}

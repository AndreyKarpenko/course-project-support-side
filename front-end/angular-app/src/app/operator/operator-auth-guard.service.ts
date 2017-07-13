import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {ApiService} from '../core/api.service';
import {StorageService} from '../core/storage.service';

@Injectable()
export class OperatorAuthGuardService implements CanActivate {
  constructor(
    private Api: ApiService,
    private router: Router,
    private storage: StorageService
  ) {}

  canActivate() {
    if (!this.storage.user) {
      return this.Api.getUser()
        .then((user) => {
          if (!user) {
            this.router.navigate(['/signin']);
            return false;
          }

          this.storage.user = user;

          if (user.role === 'operator') {
            return true;
          } else if (user.role === 'customer') {
            this.router.navigate(['/customer/home']);
            return false;
          } else {
            this.router.navigate(['/signin']);
            return false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.router.navigate(['/signin']);
          return false;
        });
    } else {
      if (this.storage.user.role === 'operator') {
        return true;
      } else {
        this.router.navigate(['/signin']);
        return false;
      }
    }
  }
}

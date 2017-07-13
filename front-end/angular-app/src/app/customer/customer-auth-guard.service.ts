import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {ApiService} from '../core/api.service';
import {StorageService} from '../core/storage.service';

@Injectable()
export class CustomerAuthGuardService implements CanActivate {
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

          if (user.role === 'customer') {
            return true;
          } else if (user.role === 'operator') {
            this.router.navigate(['/operator']);
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
      if (this.storage.user.role === 'customer') {
        return true;
      } else {
        this.router.navigate(['/signin']);
        return false;
      }
    }
  }
}

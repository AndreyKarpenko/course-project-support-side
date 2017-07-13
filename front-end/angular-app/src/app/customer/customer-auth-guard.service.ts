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
    if (!this.storage.userRole) {
      return this.Api.getUserRole()
        .then((user) => {
          if (!user) {
            this.router.navigate(['/signin']);
            return false;
          }

          if (user.role === 'customer') {
            this.storage.customerInfo.customerDetails = user;
            this.storage.userRole = user.role;

            return true;
          } else if (user.role === 'operator') {
            this.storage.operatorInfo = user;
            this.storage.userRole = user.role;
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
      if (this.storage.userRole === 'customer') {
        return true;
      } else {
        this.router.navigate(['/signin']);
        return false;
      }
    }
  }
}

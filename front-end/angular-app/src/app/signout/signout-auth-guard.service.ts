import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {StorageService} from '../core/storage.service';

@Injectable()
export class SignoutAuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  canActivate() {
    if (this.storage.user) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}

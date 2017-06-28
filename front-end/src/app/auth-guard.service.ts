import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {StorageService} from './core/storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  canActivate() {
    if (this.storage.isSignedIn) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}

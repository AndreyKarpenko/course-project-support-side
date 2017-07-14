import {Component, OnInit} from '@angular/core';

import {StorageService} from '../core/storage.service';

@Component({
  templateUrl: './signout.component.html'
})
export class SignoutComponent implements OnInit {
  constructor(private storage: StorageService) {
  }

  ngOnInit() {
    this.storage.user = null;
  }
}

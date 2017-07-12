import {Component, OnInit} from '@angular/core';

import {StorageService} from '../core/storage.service';

@Component({
  templateUrl: './signout.component.html'
})
export class SignoutComponent implements OnInit {
  constructor(private storage: StorageService) {
  }

  ngOnInit() {
    this.storage.customerInfo = {
      customerDetails: null,
      dialogDetails: null,
      dialogs: null,
      operatorDetails: null,
      operators: null,
    };
    this.storage.operatorInfo = null;
    this.storage.userRole = null;
  }
}

import {Component, OnInit} from '@angular/core';

import {StorageService} from '../../core/storage.service';

@Component({
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  dialogs;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    this.dialogs = this.storage.customerInfo.dialogs;
  }
}

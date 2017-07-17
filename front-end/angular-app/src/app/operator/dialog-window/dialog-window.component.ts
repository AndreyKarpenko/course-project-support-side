import {Component, Input, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';

import {PopupDialogComponent} from './popup-dialog.component';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWiindowComponent implements OnInit {
  @Input() dialog;

  constructor(public popupDialog: MdDialog) {}

  ngOnInit() {
  }

  onChatFinished(isEmmittedByOperator?: boolean) {
    if (isEmmittedByOperator) {
      this.popupDialog.open(PopupDialogComponent, {
        data: {
          contentText: 'Dialog successfully finished'
        },
        disableClose: true
      });
    } else {
      this.popupDialog.open(PopupDialogComponent, {
        data: {
          contentText: 'Client closed chat or connection interrupted'
        },
        disableClose: true
      });
    }
  }
}

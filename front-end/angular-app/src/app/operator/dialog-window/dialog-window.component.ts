import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MdDialog} from '@angular/material';

import {PopupDialogComponent} from './popup-dialog.component';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss']
})
export class DialogWindowComponent implements OnInit {
  @Input() dialog;
  @Output() dialogFinished = new EventEmitter();

  constructor(public popupDialog: MdDialog) {}

  ngOnInit() {
  }

  onDialogFinished(isEmittedByOperator?: boolean) {
    if (isEmittedByOperator) {
      const dialogRef = this.popupDialog.open(PopupDialogComponent, {
        data: {
          contentText: 'Dialog successfully finished'
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.dialogFinished.emit(this.dialog);
      });
    } else {
      const dialogRef = this.popupDialog.open(PopupDialogComponent, {
        data: {
          contentText: 'Client closed chat or connection interrupted'
        },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.dialogFinished.emit(this.dialog);
      });
    }
  }
}

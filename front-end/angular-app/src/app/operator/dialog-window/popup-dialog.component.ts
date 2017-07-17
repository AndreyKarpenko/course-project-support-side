import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: 'popup-dialog.component.html',
  styles: [`
    * {
      text-align: center;
    }
    
    md-dialog-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
  `]
})
export class PopupDialogComponent {
  constructor(@Inject(MD_DIALOG_DATA) public data) {}
}

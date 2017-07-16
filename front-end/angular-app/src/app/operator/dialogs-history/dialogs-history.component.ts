import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialogs-history',
  templateUrl: './dialogs-history.component.html',
  styleUrls: ['./dialogs-history.component.scss']
})
export class DialogsHistoryComponent implements OnInit {
  @Input() dialog;

  constructor() {
  }

  ngOnInit() {
  }
}

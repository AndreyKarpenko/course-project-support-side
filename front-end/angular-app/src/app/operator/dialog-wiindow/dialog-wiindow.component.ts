import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-wiindow.component.html',
  styleUrls: ['./dialog-wiindow.component.scss']
})
export class DialogWiindowComponent implements OnInit {
  @Input() dialog;

  constructor() {
  }

  ngOnInit() {
  }
}

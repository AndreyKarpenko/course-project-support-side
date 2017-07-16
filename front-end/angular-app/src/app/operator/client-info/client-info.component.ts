import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  @Input() dialog;

  constructor() {
  }

  ngOnInit() {
  }
}

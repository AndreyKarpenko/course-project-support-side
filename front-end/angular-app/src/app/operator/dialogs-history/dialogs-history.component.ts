import {Component, Input, OnInit} from '@angular/core';

import {ApiService} from '../../core/api.service';
import {GeolocationService} from '../../core/geolocation.service';

@Component({
  selector: 'app-dialogs-history',
  templateUrl: './dialogs-history.component.html',
  styleUrls: ['./dialogs-history.component.scss']
})
export class DialogsHistoryComponent implements OnInit {
  @Input() dialog;

  constructor(
    private Api: ApiService,
    private geolocation: GeolocationService
  ) {}

  ngOnInit() {
    if (this.dialog.clientPreviousDialogs) {
      this.dialog.clientPreviousDialogs.forEach((dialog) => {
        dialog.isMessagesLoaded = false;
      });
    }
  }

  accordionOnOpen(event) {
    if (!this.dialog.clientPreviousDialogs[event.index].isMessagesLoaded) {
      this.Api.getDialog(this.dialog.clientPreviousDialogs[event.index]._id)
        .then((dialog) => {
          this.dialog.clientPreviousDialogs[event.index].messages = dialog.messages;

          if (dialog.clientLocation) {
            const lat = dialog.clientLocation.lat;
            const lon = dialog.clientLocation.lon;

            this.geolocation.getAddress(lat, lon)
              .then((address) => {
                this.dialog.clientPreviousDialogs[event.index].clientAddress = address;
                this.dialog.clientPreviousDialogs[event.index].isMessagesLoaded = true;
              })
              .catch((err) => {
                console.log(err);
                this.dialog.clientPreviousDialogs[event.index].isMessagesLoaded = true;
              });
          } else {
            this.dialog.clientPreviousDialogs[event.index].isMessagesLoaded = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });

    }
  }
}

import {Component, OnInit} from '@angular/core';

import {GeolocationService} from '../core/geolocation.service';
import {StorageService} from '../core/storage.service';

@Component({
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorsComponent implements OnInit {
  dummyDialog = {
    clientEmail: 'client-1@gmail.com',
    clientLocation: {
      lat: 48.517740599999996,
      lon: 35.0335944
    },
    clientName: 'Client 1',
    startTime: Date.now()
  };
  dialogs = [];
  operator;

  constructor(
    private geolocation: GeolocationService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.operator = this.storage.user;
    this.dummyDialog['operatorId'] = this.operator.id;
  }

  addDummyDialog() {
    this.dummyDialog['messages'] = [];

    if (this.dummyDialog['clientLocation']) {
      const lat = this.dummyDialog['clientLocation'].lat;
      const lon = this.dummyDialog['clientLocation'].lon;

      this.geolocation.getAddress(lat, lon)
        .then((address) => {
          const newDummyDialog = this.deepCopy(this.dummyDialog);
          newDummyDialog.clientAddress = address;
          this.dialogs.push(newDummyDialog);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.dialogs.push(this.deepCopy(this.dummyDialog));
    }
  }

  private deepCopy(object) {
    if (typeof object !== 'object') return object;

    let tempObj;

    if (Array.isArray(object)) {
      tempObj = [];

      object.forEach((item) => {
        if (typeof item !== 'object') {
          tempObj.push(item);
        } else {
          tempObj.push(this.deepCopy(item));
        }
      });
    } else {
      tempObj = {};

      for (const key in object) {
        if (typeof object[key] !== 'object') {
          tempObj[key] = object[key];
        } else {
          tempObj[key] = this.deepCopy(object[key]);
        }
      }
    }

    return tempObj;
  }
}

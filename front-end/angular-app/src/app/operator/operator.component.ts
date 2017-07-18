import {Component, OnInit} from '@angular/core';

import {ApiService} from '../core/api.service';
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
    private Api: ApiService,
    private geolocation: GeolocationService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.operator = this.storage.user;
  }

  addDummyDialog() {
    const newDummyDialog = this.deepCopy(this.dummyDialog);
    newDummyDialog.messages = [];
    newDummyDialog.operatorId = this.operator._id;
    newDummyDialog.operatorName = this.operator.name;

    this.Api.getDialogs({clientEmail: newDummyDialog.clientEmail})
      .then((previousDialogs) => {
        newDummyDialog.clientPreviousDialogs = previousDialogs;

        if (newDummyDialog.clientLocation) {
          const lat = newDummyDialog.clientLocation.lat;
          const lon = newDummyDialog.clientLocation.lon;

          this.geolocation.getAddress(lat, lon)
            .then((address) => {
              newDummyDialog.clientAddress = address;
              newDummyDialog.dialogIndex = this.dialogs.length;
              this.dialogs.push(newDummyDialog);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          newDummyDialog.dialogIndex = this.dialogs.length;
          this.dialogs.push(newDummyDialog);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onDialogFinished(finishedDialog) {
    this.dialogs.splice(finishedDialog.dialogIndex, 1);
    this.dialogs.forEach((dialog, index) => {
      dialog.dialogIndex = index;
    });
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

import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {ApiService} from '../../core/api.service';
import {GeolocationService} from '../../core/geolocation.service';

@Injectable()
export class DialogResolver implements Resolve<any> {
  constructor(
    private Api: ApiService,
    private geolocation: GeolocationService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): any {
    const id = route.paramMap.get('id');

    return this.Api.getDialog(id)
      .then((dialog) => {
        if (dialog.clientLocation) {
          const lat = dialog.clientLocation.lat;
          const lon = dialog.clientLocation.lon;

          return this.geolocation.getAddress(lat, lon)
            .then((address) => {
              dialog.clientAddress = address;
              return dialog;
            })
            .catch((err) => {
              console.log(err);
              return dialog;
            });
        } else {
          return dialog;
        }
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/error-message']);
      });
  }
}

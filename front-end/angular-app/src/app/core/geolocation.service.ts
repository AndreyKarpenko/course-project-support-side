import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class GeolocationService {
  constructor(private http: Http) {}

  getAddress(lat, lon) {
    const serviceUrl = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';

    return this.http.get(serviceUrl + `${lat},${lon}`)
      .toPromise()
      .then((res: Response) => {
        return res.json().results[2].formatted_address || null;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('GeolocationService error occurred', error);
    return Promise.reject(error.message || error);
  }
}

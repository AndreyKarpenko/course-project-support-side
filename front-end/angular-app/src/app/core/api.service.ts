import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

const serverUrl = 'http://localhost:8000';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  getDialog(id) {
    return this.http.get(serverUrl + '/api/dialog/' + id)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getDialogs() {
    return this.http.get(serverUrl + '/api/dialogs')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getUser() {
    return this.http.get(serverUrl + '/api/user')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private handleError(error: any): Promise<any> {
    if (error.status === 404) {
      return Promise.resolve(null);
    }

    console.error('API error occurred', error);
    return Promise.reject(error.message || error);
  }
}

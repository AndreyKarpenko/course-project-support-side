import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

const serverUrl = 'http://localhost:8000';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  registerOperator(user) {
    return this.http.post(serverUrl + '/api/operator', user ).map(res => res.json());
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
    return res.json() || null;
  }

  private handleError(error: any): Promise<any> {
    if (error.status === 404) {
      return Promise.resolve(null);
    }

    console.error('API error occurred', error);
    return Promise.reject(error.message || error);
  }
}

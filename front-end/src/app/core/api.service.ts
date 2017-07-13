import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

const serverUrl = 'http://localhost:8000';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  getCustomer() {
    // ...
  }

  getDialog(id: number | string) {
    // ...
  }

  getDialogs() {
    return this.http.get(serverUrl + '/api/dialogs')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getOperator(id: number | string) {
    // ...
  }

  getOperators() {
    // ...
  }

  getUserRole() {
    return this.http.get(serverUrl + '/api/user')
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  postCustomer(object) {
    // ...
  }

  postOperator(object) {
    // ...
  }

  updateOperator(object) {
    // ...
  }

  private extractData(res: Response) {
    return res.json() || null;
  }

  private handleError(error: any): Promise<any> {
    console.error('API error occurred', error);
    return Promise.reject(error.message || error);
  }
}

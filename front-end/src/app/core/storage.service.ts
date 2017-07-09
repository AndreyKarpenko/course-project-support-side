import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  isSignedIn = true;  // for AuthGuard
  CustomerInfo = {  // Customer related info
    customerDetails: null,
    dialogDetails: null,
    dialogs: null,
    operatorDetails: null,
    operators: null,
  };
  OperatorInfo;  // Operator related info
}

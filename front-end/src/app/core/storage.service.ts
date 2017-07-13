import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  customerInfo = {  // Customer related info
    customerDetails: null,
    dialogDetails: null,
    dialogs: null,
    operatorDetails: null,
    operators: null,
  };
  operatorInfo;  // Operator related info
  userRole;
}

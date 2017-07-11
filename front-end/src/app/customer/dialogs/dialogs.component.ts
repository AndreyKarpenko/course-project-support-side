import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ApiService} from '../../core/api.service';
import {StorageService} from '../../core/storage.service';

@Component({
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  clients: any[];
  dialogs: any[];
  dialogFilters = {
    client: null,
    operator: null
  };
  filtersForm: FormGroup;
  filteredDialogs: any[];
  operators : any[];

  constructor(
    private Api: ApiService,
    private formBuilder: FormBuilder,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.dialogs = this.storage.customerInfo.dialogs;
    this.filteredDialogs = this.dialogs;

    if (this.dialogs) {
      this.operators = gatherUniqueItems(this.dialogs, 'operatorEmail', 'operatorName');
      prepandWithNullValue(this.operators);
      this.clients = gatherUniqueItems(this.dialogs, 'clientEmail', 'clientName');
      prepandWithNullValue(this.clients);

      if (!this.filtersForm) {  //first ngOnInit call
        this.filtersForm = this.formBuilder.group({
          clients: null,
          operators: null,
        });
      }
    }

    function gatherUniqueItems(source: any[], email: string, name: string): any[] {
      const uniqueOperators = {};

      source.forEach((item) => {
        uniqueOperators[item[email]] = item[name];
      });

      const result = [];

      for(let key in uniqueOperators) {
        result.push({
          email: key,
          name: uniqueOperators[key]
        });
      }

      return result;
    }

    function prepandWithNullValue(source) {
      source.unshift({
        email: null,
        name: 'All'
      });
    }
  }

  applyClientFilter(value) {
    this.dialogFilters.client = value;
    this.filterDialogs();
  }

  applyOperatorFilter(value) {
    this.dialogFilters.operator = value;
    this.filterDialogs();
  }

  filterDialogs() {
    this.filteredDialogs = this.dialogs.filter((dialog) => {
      let expectedMatches = 0;
      let matchedFilters = 0;

      if (this.dialogFilters.client) {
        expectedMatches++;

        if (dialog.clientEmail === this.dialogFilters.client) {
          matchedFilters++;
        }
      }

      if (this.dialogFilters.operator) {
        expectedMatches++;

        if (dialog.operatorEmail === this.dialogFilters.operator) {
          matchedFilters++;
        }
      }

      if (matchedFilters === expectedMatches) return dialog;
    });
  }

  refreshDialogs() {
    this.filtersForm.disable();

    this.Api.getDialogs()
      .then((dialogs) => {
        this.storage.customerInfo.dialogs = dialogs;
        this.ngOnInit();
        this.filtersForm.reset();
        this.filtersForm.enable();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

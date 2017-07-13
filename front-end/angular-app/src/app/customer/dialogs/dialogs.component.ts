import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {ApiService} from '../../core/api.service';

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
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.dialogs = data.dialogs;
        this.filteredDialogs = this.dialogs;

        if (this.dialogs) {
          this.operators = this.gatherUniqueItems(this.dialogs, 'operatorEmail', 'operatorName');
          this.prepandWithNullValue(this.operators);
          this.clients = this.gatherUniqueItems(this.dialogs, 'clientEmail', 'clientName');
          this.prepandWithNullValue(this.clients);

          if (!this.filtersForm) {  //first ngOnInit call
            this.filtersForm = this.formBuilder.group({
              clients: null,
              operators: null,
            });
          }
        }
      });
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
        this.dialogs = dialogs;
        this.filteredDialogs = dialogs;

        if (this.dialogs) {
          this.operators = this.gatherUniqueItems(this.dialogs, 'operatorEmail', 'operatorName');
          this.prepandWithNullValue(this.operators);
          this.clients = this.gatherUniqueItems(this.dialogs, 'clientEmail', 'clientName');
          this.prepandWithNullValue(this.clients);

          if (!this.filtersForm) {  //first ngOnInit call
            this.filtersForm = this.formBuilder.group({
              clients: null,
              operators: null,
            });
          }
        }

        this.filtersForm.reset();
        this.filtersForm.enable();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private gatherUniqueItems(source: any[], email: string, name: string): any[] {
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

 private prepandWithNullValue(source) {
  source.unshift({
    email: null,
    name: 'All'
  });
}
}

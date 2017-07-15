import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ApiService} from '../../core/api.service';

@Component({
  templateUrl: './dialog-details.component.html',
  styleUrls: ['./dialog-details.component.scss']
})
export class DialogDetailsComponent implements OnInit {
  dialog: any;
  constructor(
    private Api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.dialog = data.dialog;
        if (!this.dialog){
          this.router.navigate(['/page-not-found']);
        }
      })
  }
}

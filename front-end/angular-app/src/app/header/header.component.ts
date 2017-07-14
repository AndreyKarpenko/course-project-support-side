import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {StorageService} from '../core/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUrl;
  isAdditionalLinksNeeded;
  user;

  constructor(
    private router: Router,
    private storage: StorageService
  ) {
  }

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.urlAfterRedirects;
          this.user = this.storage.user;

          if (!isCustomerView(event.urlAfterRedirects)
              && !isOperatorView(event.urlAfterRedirects)) {
            this.isAdditionalLinksNeeded = event.urlAfterRedirects;
          } else {
            this.isAdditionalLinksNeeded = null;
          }
        }

        function isCustomerView(url) {
          return url.match(/^\/operator$/i);
        }

        function isOperatorView(url) {
          return url.match(/^\/customer\//i);
        }
      });
  }
}

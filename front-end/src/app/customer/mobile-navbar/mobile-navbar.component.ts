import {Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'customer-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss']
})
export class MobileNavbarComponent {
  @Input() sidenav: ElementRef;
}

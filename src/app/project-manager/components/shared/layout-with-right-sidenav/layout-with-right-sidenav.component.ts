import { Component } from '@angular/core';

import { ScreenService } from '@app/services';
@Component({
  selector: 'pm-layout-with-right-sidenav',
  templateUrl: './layout-with-right-sidenav.component.html',
  styleUrls: ['./layout-with-right-sidenav.component.scss'],
})
export class LayoutWithRightSidenavComponent {
  constructor(public screen: ScreenService) {}
}

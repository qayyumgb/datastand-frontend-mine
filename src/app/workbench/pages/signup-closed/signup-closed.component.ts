import { Component } from '@angular/core';

import { SALES_EMAIL } from '@app/constants';

@Component({
  selector: 'app-signup-closed',
  templateUrl: './signup-closed.component.html',
  styleUrls: ['./signup-closed.component.scss'],
})
export class SignupClosedComponent {
  salesEmailHref: string = 'mailto:' + SALES_EMAIL;
}

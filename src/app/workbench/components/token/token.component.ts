import { Component, Input } from '@angular/core';

import { TokenForDisplay } from '@workbench/interfaces';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent {
  @Input() token!: TokenForDisplay;

  constructor() {}

  getToolTipText(): string {
    return `(${this.token?.start},${this.token?.end})`;
  }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectBoundariesLength } from '@workbench/store/token-layers';

@Component({
  selector: 'app-token-count-dialog',
  templateUrl: './token-count-dialog.component.html',
  styleUrls: ['../base-dialog.scss'],
})
export class TokenCountDialogComponent {
  boundariesLenght$ = this.store.select(selectBoundariesLength);

  constructor(private store: Store) {}
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { removeAllTokenBoundaries } from './clear-all-tokens-dialog.actions';

@Component({
  selector: 'app-clear-all-tokens-dialog',
  templateUrl: './clear-all-tokens-dialog.component.html',
  styleUrls: ['./clear-all-tokens-dialog.component.scss'],
})
export class ClearAllTokensDialogComponent {
  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { tokenLayerId: number }
  ) {}

  removeAllTokenBoundaries() {
    this.store.dispatch(
      removeAllTokenBoundaries({ tokenLayerId: this.data.tokenLayerId })
    );
  }
}

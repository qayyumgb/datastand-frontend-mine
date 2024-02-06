import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ClearAllTokensDialogComponent } from '@workbench/components';
import * as utils from '@workbench/utils';

import { addTokenBoundary, removeTokenBoundary } from './char.actions';

@Component({
  selector: 'app-char',
  templateUrl: './char.component.html',
  styleUrls: ['./char.component.scss', '../context-menu.scss'],
})
export class CharComponent {
  @Input() public ch!: string;
  @Input() public chId!: number;
  @Input() public isLast!: boolean;
  @Input() public hasBoundary!: boolean;
  @Input() public tokenLayerId!: number;

  constructor(private dialog: MatDialog, private store: Store) {}

  addTokenBoundary(tokenLayerId: number, boundary: number) {
    this.store.dispatch(addTokenBoundary({ tokenLayerId, boundary }));
  }

  isLineBreakCh = utils.isLineBreakCh;

  isSpecialCh = utils.isSpecialCh;

  openClearAllTokensDialog(tokenLayerId: number): void {
    this.dialog.open(ClearAllTokensDialogComponent, { data: { tokenLayerId } });
  }

  removeTokenBoundary(tokenLayerId: number, boundary: number) {
    this.store.dispatch(removeTokenBoundary({ tokenLayerId, boundary }));
  }

  renderCh = utils.renderCh;
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import {
  CreateLabelDialogComponent,
  UpdateLabelDialogComponent,
} from '@workbench/components';

import {
  closeLabelSetWindow,
  removeLabel,
  selectLabel,
} from './label-set-window.actions';
import { selectLabelSetWindowModel } from './label-set-window.selectors';

@Component({
  selector: 'app-label-set',
  templateUrl: './label-set-window.component.html',
  styleUrls: [
    '../window/window.component.scss',
    './label-set-window.component.scss',
  ],
})
export class LabelSetWindowComponent {
  title: string = 'Label set';
  selected: number = -1;
  width: string = '200px';
  // 60px == topbar height
  // 200px == window height
  // 15px == gap
  top: string = 'calc(60px + 200px + 5% + 15px)';
  left: string = '5%';
  readonly vm$ = this.store.select(selectLabelSetWindowModel);

  constructor(private dialog: MatDialog, private store: Store) {}

  changeSelection(labelId: number): void {
    this.store.dispatch(selectLabel({ labelId }));
  }

  closeWindow(): void {
    this.store.dispatch(closeLabelSetWindow());
  }

  removeLabel(labelId: number): void {
    this.store.dispatch(removeLabel({ id: labelId }));
  }

  openCreateLabelDialog(): void {
    this.dialog.open(CreateLabelDialogComponent);
  }

  openUpdateLabelDialog(labelId: number): void {
    this.dialog.open(UpdateLabelDialogComponent, {
      data: { labelId },
    });
  }
}

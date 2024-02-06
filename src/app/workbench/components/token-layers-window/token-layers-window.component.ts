import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import {
  ClearAllTokensDialogComponent,
  CreateTokenLayerDialogComponent,
  UpdateTokenLayerDialogComponent,
} from '@workbench/components';

import { selectRoutedTaskTextId } from '@app/workbench/store/selectors';
import {
  addBasicTokenLayers,
  closeTokenLayersWindow,
  removeTokenLayer,
  selectTokenLayer,
} from './token-layers-window.actions';
import { selectTokenLayersWindowModel } from './token-layers-window.selectors';

@Component({
  selector: 'app-token-layers',
  templateUrl: './token-layers-window.component.html',
  styleUrls: [
    '../window/window.component.scss',
    './token-layers-window.component.scss',
  ],
})
export class TokenLayersWindowComponent {
  title: string = 'Token layers';
  top: string = 'calc(60px + 5%)'; // 60px == $topbar height
  left: string = '5%';
  readonly vm$ = this.store.select(selectTokenLayersWindowModel);
  readonly taskTextId$ = this.store.select(selectRoutedTaskTextId);

  constructor(private dialog: MatDialog, private store: Store) {}

  addBasicTokenLayers(): void {
    this.store.dispatch(addBasicTokenLayers());
  }

  closeWindow(): void {
    this.store.dispatch(closeTokenLayersWindow());
  }

  changeSelection(id: number): void {
    this.store.dispatch(selectTokenLayer({ id }));
  }

  openClearAllTokensDialog(tokenLayerId: number): void {
    this.dialog.open(ClearAllTokensDialogComponent, { data: { tokenLayerId } });
  }

  openCreateTokenLayerDialog(): void {
    this.taskTextId$.pipe(take(1)).subscribe((taskTextId) => {
      this.dialog.open(CreateTokenLayerDialogComponent, {
        data: taskTextId,
      });
    });
  }

  openUpdateTokenLayerDialog(selected: number): void {
    this.dialog.open(UpdateTokenLayerDialogComponent, {
      data: { selected: selected },
    });
  }

  removeTokenLayerAndUpdateSelection(id: number): void {
    this.store.dispatch(removeTokenLayer({ id }));
  }
}

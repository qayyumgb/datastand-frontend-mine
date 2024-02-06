import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  selectBodyLength,
  selectBodyLengthWithoutSpaces,
} from '@workbench/store/task-text';
@Component({
  selector: 'app-byte-count-dialog',
  templateUrl: './byte-count-dialog.component.html',
  styleUrls: ['../base-dialog.scss'],
})
export class ByteCountDialogComponent {
  textLenght$ = this.store.select(selectBodyLength);
  textLengthWithoutSpaces$ = this.store.select(selectBodyLengthWithoutSpaces);

  constructor(private store: Store) {}
}

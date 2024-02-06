import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectFileDetailsDialogViewModel } from './file-details-dialog.selectors';

@Component({
  selector: 'app-file-details-dialog',
  templateUrl: './file-details-dialog.component.html',
  styleUrls: ['../base-dialog.scss'],
})
export class FileDetailsDialogComponent {
  readonly vm$ = this.store.select(selectFileDetailsDialogViewModel);

  constructor(private store: Store) {}
}

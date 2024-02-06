import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { removeAllAnnotations } from './clear-all-annotations-dialog.actions';

@Component({
  selector: 'app-clear-all-annotations-dialog',
  templateUrl: './clear-all-annotations-dialog.component.html',
  styleUrls: ['./clear-all-annotations-dialog.component.scss'],
})
export class ClearAllAnnotationsDialogComponent {
  constructor(private store: Store) {}

  removeAllAnnotations() {
    this.store.dispatch(removeAllAnnotations());
  }
}

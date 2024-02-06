import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSpansLength } from '@workbench/store/selectors';

@Component({
  selector: 'app-annotation-count-dialog',
  templateUrl: './annotation-count-dialog.component.html',
  styleUrls: ['../base-dialog.scss'],
})
export class AnnotationCountDialogComponent {
  spansLength$ = this.store.select(selectSpansLength);

  constructor(private store: Store) {}
}

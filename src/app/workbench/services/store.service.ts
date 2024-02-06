import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveAs } from 'file-saver';
import { take } from 'rxjs';

import { selectAllSpans } from '@app/workbench/store/spans';
import { selectBody } from '@workbench/store/task-text';
import { selectCurrentBoundaries } from '@workbench/store/token-layers';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private store: Store) {}

  downloadContent(selector: any, fileName: string) {
    this.store
      .select(selector)
      .pipe(take(1))
      .subscribe((content) => {
        var blob = new Blob([JSON.stringify(content, null, 2)], {
          type: 'text/plain;charset=utf-8',
        });
        saveAs(blob, fileName);
      });
  }

  downloadSpans() {
    this.downloadContent(selectAllSpans, 'spans.json');
  }

  downloadText() {
    this.downloadContent(selectBody, 'text.txt');
  }

  downloadTokenBoundaries() {
    this.downloadContent(selectCurrentBoundaries, 'tokens.json');
  }
}

import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { ClearAllAnnotationsDialogComponent } from '@workbench/components';
import { Span, SpanForDisplay, SpanStatus } from '@workbench/interfaces';
import * as utils from '@workbench/utils';

import {
  acceptSuggestion,
  acceptSuggestions,
  rejectSuggestions,
  removeSpan,
  runAnnotator,
} from './span.actions';
import { selectSpanViewModel } from './span.selectors';

@Component({
  selector: 'app-span',
  templateUrl: './span.component.html',
  styleUrls: ['./span.component.scss', '../context-menu.scss'],
})
export class SpanComponent {
  @Input() spanForDisplay!: SpanForDisplay;
  readonly vm$ = this.store.select(selectSpanViewModel);

  constructor(private dialog: MatDialog, private store: Store) {}

  acceptSpan(spanId: number) {
    this.store.dispatch(acceptSuggestion({ id: spanId }));
  }

  acceptSuggestions() {
    this.store.dispatch(acceptSuggestions());
  }

  isPending(span: Span) {
    return span.status == SpanStatus.Pending || span.suggestion_status == 'new';
  }

  openClearAllAnnotationsDialog(): void {
    this.dialog.open(ClearAllAnnotationsDialogComponent);
  }

  rejectSuggestions() {
    this.store.dispatch(rejectSuggestions());
  }

  removeSpan(spanId: number) {
    this.store.dispatch(removeSpan({ id: spanId }));
  }

  renderSpanContent(spanForDisplay: SpanForDisplay): string {
    return `${utils.renderContent(
      spanForDisplay.content
    )} ● <span class="label">${spanForDisplay.labelContent}</span>`;
  }

  runAnnotator(annotatorId: string): void {
    this.store.dispatch(runAnnotator({ annotatorId }));
  }
}

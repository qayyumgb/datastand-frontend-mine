import { Component } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Store } from '@ngrx/store';

import {
  ANNOTATE_MODELS,
  ANNOTATE_SIMILAR_SPANS_MODELS,
  OFF_MODEL,
} from '@app/constants';
import { NlpModel } from '@workbench/interfaces';
import * as utils from '@workbench/utils';

import {
  acceptSuggestions,
  closeSuggestionsWindow,
  rejectSuggestions,
  runAnnotator,
  selectAnnotator,
  toggleRunAutomatically,
} from './suggestions-window.actions';
import { selectSuggestionsWindowModel } from './suggestions-window.selectors';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions-window.component.html',
  styleUrls: [
    '../window/window.component.scss',
    './suggestions-window.component.scss',
  ],
})
export class SuggestionsWindowComponent {
  title: string = 'Suggestions';
  width: string = '200px';
  // 60px == topbar height
  // 200px == window height
  // 15px == gap
  top: string = 'calc(60px + 200px + 5% + 15px)';
  right: string = '5%';

  annotateModels?: { [key: string]: NlpModel };
  annotateSimilarSpansModels?: { [key: string]: NlpModel };
  allModels?: { [key: string]: NlpModel };
  readonly vm$ = this.store.select(selectSuggestionsWindowModel);

  constructor(private store: Store) {
    // TODO(gustavoauma): Refactor this, use dictionaries by default in constants.
    this.annotateModels = utils.listToDict(ANNOTATE_MODELS, (x) => x.id);
    this.annotateSimilarSpansModels = utils.listToDict(
      ANNOTATE_SIMILAR_SPANS_MODELS,
      (x) => x.id
    );
    this.allModels = utils.listToDict(
      [...ANNOTATE_MODELS, ...ANNOTATE_SIMILAR_SPANS_MODELS],
      (x) => x.id
    );
  }

  acceptSuggestions(): void {
    this.store.dispatch(acceptSuggestions());
  }

  closeWindow(): void {
    this.store.dispatch(closeSuggestionsWindow());
  }

  onSelectionChange(options: MatListOption[]) {
    this.store.dispatch(selectAnnotator({ id: options[0].value }));
  }

  rejectSuggestions(): void {
    this.store.dispatch(rejectSuggestions());
  }

  runAnnotator(annotatorId: string): void {
    if (annotatorId == OFF_MODEL.id) {
      return;
    } else {
      this.store.dispatch(runAnnotator({ annotatorId }));
    }
  }

  toggleRunAutomatically(): void {
    this.store.dispatch(toggleRunAutomatically());
  }
}

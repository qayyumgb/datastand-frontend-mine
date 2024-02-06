import { createSelector } from '@ngrx/store';

import {
  getWindowSuggestions,
  hasPendingSpans,
  selectAllLabels,
  selectAllSpans,
  selectCurrentAnnotatorId,
  selectRunAutomatically,
} from '@workbench/store/selectors';

export const selectSuggestionsWindowModel = createSelector(
  selectCurrentAnnotatorId,
  selectAllLabels,
  selectAllSpans,
  selectRunAutomatically,
  hasPendingSpans,
  getWindowSuggestions,
  (
    currentAnnotatorId,
    labels,
    spans,
    runAutomatically,
    hasPendingSpans,
    window
  ) => ({
    currentAnnotatorId,
    labels,
    spans,
    runAutomatically,
    hasPendingSpans,
    window,
  })
);

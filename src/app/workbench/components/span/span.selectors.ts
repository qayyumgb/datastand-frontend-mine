import { createSelector } from '@ngrx/store';

import {
  hasPendingSpans,
  isAnnotationsTabSelected,
  selectCurrentAnnotatorId,
} from '@workbench/store/selectors';

export const selectSpanViewModel = createSelector(
  isAnnotationsTabSelected,
  hasPendingSpans,
  selectCurrentAnnotatorId,
  (isAnnotationsTabSelected, hasPendingSpans, currentAnnotatorId) => ({
    hasPendingSpans,
    currentAnnotatorId,
    // Derived
    canAcceptSuggestions: hasPendingSpans,
    canOpenClearAllAnnotationsDialog: isAnnotationsTabSelected,
    canRejectSuggestions: hasPendingSpans,
  })
);

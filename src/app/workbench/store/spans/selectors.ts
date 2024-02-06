// TODO(gustavoauma): Check if we can use getSelectors() here.

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Span } from '@workbench/interfaces';
import * as utils from '@workbench/utils';

import { getLoadingSelectors } from '../shared/selectors';
import { selectLabelEntities } from '../task-labels/selectors';
import { selectBody } from '../task-text/selectors';
import { selectCurrentBoundaries } from '../token-layers/selectors';
import { SpansState, spansFeatureKey } from './reducer';

export const selectSpansState =
  createFeatureSelector<SpansState>(spansFeatureKey)!;

export const selectSpanEntities = createSelector(
  selectSpansState,
  (state) => state && state.entities
);

export const selectAllSpans = createSelector(
  selectSpanEntities,
  (entities) => entities && <Span[]>Object.values(entities)
);

export const selectSpansLength = createSelector(
  selectAllSpans,
  (entities) => entities?.length! || 0
);

export const hasPendingSpans = createSelector(selectAllSpans, (spans) => {
  if (spans?.find((span) => span.suggestion_status == 'new')) {
    return true;
  } else {
    return false;
  }
});

export const selectSpansForDisplay = createSelector(
  selectAllSpans,
  selectLabelEntities,
  selectBody,
  (spans, labelEntities, text) => {
    if (
      text &&
      spans &&
      labelEntities &&
      Object.keys(labelEntities) &&
      Object.keys(labelEntities).length > 0
    ) {
      return utils.getSpansForDisplay(text, spans, labelEntities);
    } else {
      return null;
    }
  }
);

export const selectElementsForDisplay = createSelector(
  selectBody,
  selectCurrentBoundaries,
  selectLabelEntities,
  selectAllSpans,
  (text, boundaries, labelEntities, currentSpans) => {
    if (
      text &&
      boundaries &&
      boundaries.length > 0 &&
      labelEntities &&
      Object.keys(labelEntities) &&
      Object.keys(labelEntities).length > 0 &&
      currentSpans
    ) {
      return utils.getElementsForDisplay(
        text,
        boundaries,
        labelEntities,
        currentSpans
      );
    } else {
      return null;
    }
  }
);

export const {
  selectCallState: selectSpansCallState,
  isLoading: isSpansLoading,
  isLoaded: isSpansLoaded,
} = getLoadingSelectors(selectSpansState);

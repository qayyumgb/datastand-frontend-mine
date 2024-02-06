import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getLoadingSelectors } from '../shared/selectors';
import { TaskTextState, textFeatureKey } from './reducer';

export const selectTextState =
  createFeatureSelector<TaskTextState>(textFeatureKey)!;

export const selectTitle = createSelector(
  selectTextState,
  (state: TaskTextState) => state.name
);

export const selectBody = createSelector(
  selectTextState,
  (state: TaskTextState) => state.raw_string
);

export const selectBodyLength = createSelector(
  selectTextState,
  (state: TaskTextState) => state.raw_string.length
);

export const selectBodyLengthWithoutSpaces = createSelector(
  selectTextState,
  (state: TaskTextState) => state.raw_string.match(/\S/g)?.length || 0
);

export const selectTaskTextStatus = createSelector(
  selectTextState,
  (state: TaskTextState) => state.status
);

export const {
  selectCallState: selectTextCallState,
  isLoading: isTextLoading,
  isLoaded: isTextLoaded,
} = getLoadingSelectors(selectTextState);

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WorkbenchWindows } from '@workbench/interfaces';
import { WorkbenchUiState, workbenchUiFeatureKey } from './reducer';

export const selectWorkbenchUiState = createFeatureSelector<WorkbenchUiState>(
  workbenchUiFeatureKey
)!;

// General

export const selectCreated = createSelector(
  selectWorkbenchUiState,
  (state: WorkbenchUiState) => state.created
);

export const selectLastModified = createSelector(
  selectWorkbenchUiState,
  (state: WorkbenchUiState) => state.lastModified
);

// Tabs

export const getSelectedTabId = createSelector(
  selectWorkbenchUiState,
  (state: WorkbenchUiState) => state.selectedTabId
);

export const isTokensTabSelected = createSelector(
  getSelectedTabId,
  (id: number) => id == 0
);

export const isAnnotationsTabSelected = createSelector(
  getSelectedTabId,
  (id: number) => id == 1
);

// Windows

export const selectWindows = createSelector(
  selectWorkbenchUiState,
  (state: WorkbenchUiState) => state.windows
);

export const getWindowComments = createSelector(
  selectWindows,
  (state: WorkbenchWindows) => state.comments
);

export const getWindowLabelSet = createSelector(
  selectWindows,
  (state: WorkbenchWindows) => state.labelSet
);

export const getWindowSuggestions = createSelector(
  selectWindows,
  (state: WorkbenchWindows) => state.suggestions
);

export const getWindowTokenizers = createSelector(
  selectWindows,
  (state: WorkbenchWindows) => state.tokenizers
);

export const getWindowTokenLayers = createSelector(
  selectWindows,
  (state: WorkbenchWindows) => state.tokenLayers
);

// Annotators

export const selectCurrentAnnotatorId = createSelector(
  selectWorkbenchUiState,
  (state: WorkbenchUiState) => state.selectedAnnotatorId
);

export const selectRunAutomatically = createSelector(
  selectWorkbenchUiState,
  (state: WorkbenchUiState) => state.runAutomatically
);

export const isAnnotatorSelected = createSelector(
  selectCurrentAnnotatorId,
  (annotator) => annotator != null
);

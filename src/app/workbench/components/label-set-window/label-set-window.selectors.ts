import { createSelector } from '@ngrx/store';

import {
  canEditLabel,
  getWindowLabelSet,
  isAnnotationsTabSelected,
  isLabelsInitializing,
  isLabelsLoaded,
  selectCurrentLabel,
  selectCurrentLabelId,
  selectCurrentLabelIndex,
  selectCurrentLabels,
} from '@workbench/store/selectors';

export const selectLabelSetWindowModel = createSelector(
  isAnnotationsTabSelected,
  isLabelsLoaded,
  isLabelsInitializing,
  canEditLabel,
  getWindowLabelSet,
  selectCurrentLabel,
  selectCurrentLabelId,
  selectCurrentLabelIndex,
  selectCurrentLabels,
  (
    isAnnotationsTabSelected,
    isLabelsLoaded,
    isLabelsInitializing,
    canEditLabel,
    window,
    currentLabel,
    currentLabelId,
    currentLabelIndex,
    currentLabels
  ) => ({
    isAnnotationsTabSelected,
    isLabelsLoaded,
    isLabelsInitializing,
    canEditLabel,
    window,
    currentLabel,
    currentLabelId,
    currentLabelIndex,
    currentLabels,
    // Derived
    canRemoveLabel: canEditLabel,
    canOpenCreateLabelDialog: isAnnotationsTabSelected,
    canOpenUpdateLabelDialog: canEditLabel,
  })
);

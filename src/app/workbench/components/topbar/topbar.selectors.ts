import { createSelector } from '@ngrx/store';

import {
  canEditLabel,
  canEditTokenLayer,
  getSelectedTabId,
  isAnnotationsTabSelected,
  isCommentSelected,
  isTextLoaded,
  isTextLoading,
  isTokensTabSelected,
  selectAllSpans,
  selectAllTokenLayers,
  selectBody,
  selectCurrentCommentId,
  selectCurrentLabelId,
  selectCurrentTokenLayerId,
  selectSpansForDisplay,
  selectTaskData,
  selectTaskTextStatus,
  selectTitle,
  selectTokensForDisplay,
  selectWindows,
} from '@workbench/store/selectors';

const canToggleTokenLayersWindow = createSelector(
  isTokensTabSelected,
  isAnnotationsTabSelected,
  (isTokensTabSelected, isAnnotationsTabSelected) =>
    isTokensTabSelected || isAnnotationsTabSelected
);

export const selectTopbarConditionsVM = createSelector(
  canEditLabel,
  canEditTokenLayer,
  canToggleTokenLayersWindow,
  isAnnotationsTabSelected,
  isCommentSelected,
  isTextLoaded,
  isTextLoading,
  isTokensTabSelected,
  (
    canEditLabel,
    canEditTokenLayer,
    canToggleTokenLayersWindow,
    isAnnotationsTabSelected,
    isCommentSelected,
    isTextLoaded,
    isTextLoading,
    isTokensTabSelected
  ) => {
    return {
      canEditTokenLayer,
      canToggleTokenLayersWindow,
      isTextLoaded,
      isTextLoading,
      // Derived
      canCopyAnnotations: isAnnotationsTabSelected,
      canCopyTokens: canEditTokenLayer,
      canOpenClearAllAnnotationsDialog: isAnnotationsTabSelected,
      canOpenClearAllTokensDialog: canEditTokenLayer,
      canOpenCreateLabelDialog: isAnnotationsTabSelected,
      canOpenUpdateLabelDialog: canEditLabel,
      canOpenCreateTokenLayerDialog: isTokensTabSelected,
      canOpenUpdateCommentDialog: isCommentSelected,
      canOpenUpdateTokenLayerDialog: canEditTokenLayer,
      canRemoveComment: isCommentSelected,
      canRemoveLabel: canEditLabel,
      canRemoveTokenLayer: canEditTokenLayer,
      canToggleLabelSetWindow: isAnnotationsTabSelected,
      canToggleSuggestionsWindow: isAnnotationsTabSelected,
      canToggleTokenizersWindow: isTokensTabSelected,
    };
  }
);

export const selectTopbarVM = createSelector(
  getSelectedTabId,
  isAnnotationsTabSelected,
  isTokensTabSelected,
  selectCurrentCommentId,
  selectCurrentLabelId,
  selectCurrentTokenLayerId,
  selectBody,
  selectSpansForDisplay,
  selectTaskData,
  selectTitle,
  selectTokensForDisplay,
  selectWindows,
  selectAllSpans,
  selectAllTokenLayers,
  selectTaskTextStatus,
  (
    selectedTabId,
    isAnnotationsTabSelected,
    isTokensTabSelected,
    currentCommentId,
    currentLabelId,
    currentTokenLayerId,
    raw_string,
    spansForDisplay,
    taskTextData,
    name,
    tokensForDisplay,
    windows,
    spans,
    tokenLayers,
    status
  ) => {
    return {
      selectedTabId,
      isAnnotationsTabSelected,
      isTokensTabSelected,
      currentCommentId,
      currentLabelId,
      currentTokenLayerId,
      raw_string,
      spansForDisplay,
      taskTextData,
      name,
      tokensForDisplay,
      windows,
      spans,
      tokenLayers,
      status,
    };
  }
);

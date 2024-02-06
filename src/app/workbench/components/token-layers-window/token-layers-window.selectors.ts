import { createSelector } from '@ngrx/store';

import {
  canEditTokenLayer,
  getWindowTokenLayers,
  isTokenLayersLoaded,
  isTokenLayersLoading,
  isTokensTabSelected,
  selectAllTokenLayers,
  selectCurrentTokenLayer,
  selectCurrentTokenLayerId,
} from '@workbench/store/selectors';

export const selectTokenLayersWindowModel = createSelector(
  canEditTokenLayer,

  isTokenLayersLoading,
  isTokenLayersLoaded,
  isTokensTabSelected,
  getWindowTokenLayers,
  selectAllTokenLayers,
  selectCurrentTokenLayer,
  selectCurrentTokenLayerId,
  (
    canEditTokenLayer,
    isTokenLayersLoading,
    isTokenLayersLoaded,
    isTokensTabSelected,
    window,
    allTokenLayers,
    currentTokenLayer,
    currentTokenLayerId
  ) => ({
    window,
    allTokenLayers,
    currentTokenLayer,
    currentTokenLayerId,
    isTokenLayersLoading,
    isTokenLayersLoaded,
    // Derived
    canAddBasicLayers: isTokensTabSelected,
    canOpenCreateTokenLayerDialog: isTokensTabSelected,
    canOpenUpdateTokenLayerDialog: canEditTokenLayer,
    canRemoveTokenLayerAndUpdateSelection: canEditTokenLayer,
    canOpenClearAllTokensDialog: canEditTokenLayer,
  })
);

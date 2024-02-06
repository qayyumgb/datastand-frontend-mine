import { createSelector } from '@ngrx/store';

import {
  hasTokenLayers,
  isTextLoaded,
  isTextLoading,
  isTokenLayersLoaded,
  isTokenLayersLoading,
  selectBody,
  selectCurrentBoundaries,
  selectCurrentTokenLayerId,
} from '@workbench/store/selectors';

export const selectTokensTabPageModel = createSelector(
  selectBody,
  hasTokenLayers,
  isTextLoaded,
  isTextLoading,
  isTokenLayersLoaded,
  isTokenLayersLoading,
  selectCurrentTokenLayerId,
  selectCurrentBoundaries,
  (
    text,
    hasTokenLayers,
    isTextLoaded,
    isTextLoading,
    isTokenLayersLoaded,
    isTokenLayersLoading,
    selectedTokenLayerId,
    boundaries
  ) => ({
    text,
    hasTokenLayers,
    isTextLoaded,
    isTextLoading,
    isTokenLayersLoaded,
    isTokenLayersLoading,
    selectedTokenLayerId,
    boundaries,
  })
);

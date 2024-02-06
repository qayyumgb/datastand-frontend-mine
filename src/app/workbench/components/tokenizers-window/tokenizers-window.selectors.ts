import { createSelector } from '@ngrx/store';

import {
  canEditTokenLayer,
  getWindowTokenizers,
  hasTokenLayers,
  selectCurrentTokenLayerId,
} from '@workbench/store/selectors';

export const selectTokenizersWindowModel = createSelector(
  canEditTokenLayer,
  hasTokenLayers,
  selectCurrentTokenLayerId,
  getWindowTokenizers,
  (canEditTokenLayer, hasTokenLayers, selected, window) => ({
    hasTokenLayers,
    selected,
    window,
    // Derived
    canRunTokenizer: canEditTokenLayer,
  })
);

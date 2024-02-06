import { createSelector } from '@ngrx/store';

import { isLabelSelected } from './task-labels';
import { isTokenLayerSelected } from './token-layers';
import { isAnnotationsTabSelected, isTokensTabSelected } from './workbench-ui';

export const canEditTokenLayer = createSelector(
  isTokensTabSelected,
  isTokenLayerSelected,
  (isTokensTabSelected, isTokenLayerSelected) =>
    isTokensTabSelected && isTokenLayerSelected
);

export const canEditLabel = createSelector(
  isAnnotationsTabSelected,
  isLabelSelected,
  (isAnnotationsTabSelected, isLabelSelected) =>
    isAnnotationsTabSelected && isLabelSelected
);

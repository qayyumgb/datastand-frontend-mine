import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as utils from '@workbench/utils';

import { getLoadingSelectors } from '../shared/selectors';
import { selectBody } from '../task-text';
import {
  TokenLayersState,
  tokenLayersAdapter,
  tokenLayersFeatureKey,
} from './reducer';

const { selectIds, selectEntities, selectAll, selectTotal } =
  tokenLayersAdapter.getSelectors();

export const getSelectedTokenLayerId = (state: TokenLayersState) =>
  state.selectedTokenLayerId;

export const selectTokenLayerState = createFeatureSelector<TokenLayersState>(
  tokenLayersFeatureKey
)!;

export const selectTokenLayerIds = createSelector(
  selectTokenLayerState,
  selectIds
);

export const selectTokenLayerEntities = createSelector(
  selectTokenLayerState,
  selectEntities
);

export const selectAllTokenLayers = createSelector(
  selectTokenLayerState,
  selectAll
);

export const selectTokenLayerTotal = createSelector(
  selectTokenLayerState,
  selectTotal
);

export const hasTokenLayers = createSelector(
  selectTokenLayerTotal,
  (tokenLayerTotal) => tokenLayerTotal > 0
);

export const selectCurrentTokenLayerId = createSelector(
  selectTokenLayerState,
  getSelectedTokenLayerId
);

export const selectCurrentTokenLayer = createSelector(
  selectTokenLayerEntities,
  selectCurrentTokenLayerId,
  (tokenLayerEntities, tokenLayerId) => tokenLayerEntities[tokenLayerId!]
);

export const selectCurrentBoundaries = createSelector(
  selectCurrentTokenLayer,
  (tokenLayer) => tokenLayer?.boundaries
);

export const hasBoundaries = createSelector(
  selectCurrentBoundaries,
  (boundaries) => boundaries?.length! > 0
);

export const selectBoundariesLength = createSelector(
  selectCurrentBoundaries,
  (boundaries) => boundaries?.length || 0
);

export const isTokenLayerSelected = createSelector(
  selectCurrentTokenLayerId,
  (tokenLayerId) => tokenLayerId !== null
);

export const selectTokensForDisplay = createSelector(
  selectBody,
  selectCurrentBoundaries,
  (text, boundaries) => {
    if (text && boundaries) {
      return utils.getTokensForDisplay(text, boundaries);
    } else {
      return null;
    }
  }
);

export const {
  selectCallState: selectTokenLayerCallState,
  isLoading: isTokenLayersLoading,
  isLoaded: isTokenLayersLoaded,
} = getLoadingSelectors(selectTokenLayerState);

import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { TextApiActions, TokenLayerApiActions } from '@app/services';
import {
  CharActions,
  TokenLayersWindowActions,
  WorkbenchActions,
} from '@workbench/actions';
import * as utils from '@workbench/utils';

import { CallState, LoadingState } from '@app/interfaces';
import { TokenLayer } from '@workbench/interfaces';

export const tokenLayersFeatureKey = 'tokenLayers';

export interface TokenLayersState extends EntityState<TokenLayer> {
  // additional entities state properties
  selectedTokenLayerId: number | null;
  callState: CallState;
}

export const tokenLayersAdapter: EntityAdapter<TokenLayer> =
  createEntityAdapter<TokenLayer>({
    sortComparer: utils.sortComparerByName,
  });

export const initialState: TokenLayersState =
  tokenLayersAdapter.getInitialState({
    selectedTokenLayerId: null,
    callState: LoadingState.INIT,
  });

export const tokenLayersReducer = createReducer(
  initialState,
  // TokenLayersWindowActions
  on(TokenLayersWindowActions.selectTokenLayer, (state, { id }) => ({
    ...state,
    selectedTokenLayerId: id,
  })),
  // Topbar actions
  // TODO(gustavoauma): Implement this.
  // on(TopbarActions.clearTask, (_) => initialTokenLayersState),
  on(TextApiActions.addBasicTokenLayersSuccess, (state, { tokenLayers }) => {
    return tokenLayersAdapter.addMany(tokenLayers, {
      ...state,
      // 'whitespace' token layer has index [2].
      selectedTokenLayerId: tokenLayers[2]?.id,
    });
  }),
  on(TokenLayerApiActions.addTokenLayerSuccess, (state, { tokenLayer }) => {
    return tokenLayersAdapter.addOne(tokenLayer, {
      ...state,
      selectedTokenLayerId: tokenLayer.id,
    });
  }),
  on(
    TokenLayerApiActions.addTokenBoundarySuccess,
    TokenLayerApiActions.removeAllTokenBoundariesSuccess,
    TokenLayerApiActions.removeTokenBoundarySuccess,
    TokenLayerApiActions.runTokenizerSuccess,
    TokenLayerApiActions.updateTokenLayerSuccess,
    (state, { tokenLayer }) => tokenLayersAdapter.updateOne(tokenLayer, state)
  ),
  // Use optimistic updates for Token boundaries.
  // TODO(gustavoauma): Refactor this, there is too much logic in the reducer.
  on(CharActions.addTokenBoundary, (state, { tokenLayerId, boundary }) => {
    const tokenLayer = state.entities[tokenLayerId];
    if (!tokenLayer) {
      return state;
    }
    const newBoundaries = utils.addBoundary(boundary, tokenLayer.boundaries);
    const newTokenLayer = { ...tokenLayer, boundaries: newBoundaries };
    return tokenLayersAdapter.updateOne(
      { id: tokenLayerId, changes: newTokenLayer },
      state
    );
  }),
  on(
    TokenLayerApiActions.addTokenBoundaryFailure,
    (state, { tokenLayerId, boundary }) => {
      const tokenLayer = state.entities[tokenLayerId];
      if (!tokenLayer) {
        return state;
      }
      const boundaries = tokenLayer.boundaries;
      const newBoundaries = boundaries.filter((b) => b !== boundary);
      const newTokenLayer = { ...tokenLayer, boundaries: newBoundaries };
      return tokenLayersAdapter.updateOne(
        { id: tokenLayerId, changes: newTokenLayer },
        state
      );
    }
  ),
  on(TokenLayerApiActions.loadTokenLayersSuccess, (state, action) => {
    // Keep the TokenLayer selection, if possible.
    //
    // We use the TokenLayer name to find the selection in the new list.
    // TODO(gustavoauma): Move this logic to effects.
    const previousTokenLayer = state.entities[state.selectedTokenLayerId!];
    if (previousTokenLayer) {
      var selectedTokenLayerId = utils.keepSelectionIfPossible(
        action.tokenLayers,
        previousTokenLayer.name
      );
    } else {
      var selectedTokenLayerId = utils.getLastObjectIdOrNull(
        action.tokenLayers
      );
    }

    return tokenLayersAdapter.setAll(action.tokenLayers, {
      ...state,
      selectedTokenLayerId: selectedTokenLayerId,
      callState: LoadingState.LOADED,
    });
  }),
  on(TokenLayerApiActions.removeTokenLayerSuccess, (state, { id }) =>
    tokenLayersAdapter.removeOne(id, {
      ...state,
      selectedTokenLayerId: utils.getOtherOrNull(state.ids, id),
    })
  ),
  // Clear the store when loading new data.
  on(WorkbenchActions.loadTaskData, () => ({
    ...initialState,
    callState: LoadingState.LOADING,
  }))
);

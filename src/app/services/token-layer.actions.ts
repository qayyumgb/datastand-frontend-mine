import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { TokenLayer } from '@workbench/interfaces';

export const addTokenBoundarySuccess = createAction(
  '[TokenLayer API] Add Token Boundary Success',
  props<{ tokenLayer: Update<TokenLayer> }>()
);

export const addTokenBoundaryFailure = createAction(
  '[TokenLayer API] Add Token Boundary Failure',
  props<{ tokenLayerId: number; boundary: number; error: any }>()
);

export const addTokenLayerSuccess = createAction(
  '[TokenLayer API] TokenLayer Added Succesfully',
  props<{ tokenLayer: TokenLayer }>()
);

// TODO(gustavoauma): Implement error handling properly.
export const addTokenLayerFailure = createAction(
  '[TokenLayer API] Add TokenLayer Failure',
  props<{ error: any }>()
);

export const loadTokenLayersSuccess = createAction(
  '[TokenLayer API] Load TokenLayers Success',
  props<{ tokenLayers: TokenLayer[] }>()
);

export const loadTokenLayersFailure = createAction(
  '[TokenLayer API] Load TokenLayers Failure',
  props<{ error: any }>()
);

export const refreshTokenLayersSuccess = createAction(
  '[TokenLayer API] Refresh TokenLayers Success',
  props<{ tokenLayers: TokenLayer[] }>()
);

export const refreshTokenLayersFailure = createAction(
  '[TokenLayer API] Refresh TokenLayers Failure',
  props<{ error: any }>()
);

export const removeAllTokenBoundariesSuccess = createAction(
  '[TokenLayer API] Remove All Token Boundaries Success',
  props<{ tokenLayer: Update<TokenLayer> }>()
);

export const removeAllTokenBoundariesFailure = createAction(
  '[TokenLayer API] Remove All Token Boundaries Failure',
  props<{ error: any }>()
);

export const removeTokenBoundarySuccess = createAction(
  '[TokenLayer API] Remove Token Boundary Success',
  props<{ tokenLayer: Update<TokenLayer> }>()
);

export const removeTokenBoundaryFailure = createAction(
  '[TokenLayer API] Remove Token Boundary Failure',
  props<{ error: any }>()
);

export const removeTokenLayerSuccess = createAction(
  '[TokenLayer API] Remove TokenLayer Success',
  props<{ id: number }>()
);

export const removeTokenLayerFailure = createAction(
  '[TokenLayer API] Remove TokenLayer Failure',
  props<{ error: any }>()
);

export const runTokenizerSuccess = createAction(
  '[TokenLayer API] Run Tokenizer Success',
  props<{ tokenLayer: Update<TokenLayer> }>()
);

export const runTokenizerFailure = createAction(
  '[TokenLayer API] Run Tokenizer Failure',
  props<{ error: any }>()
);

export const updateTokenLayerSuccess = createAction(
  '[TokenLayer API] Update TokenLayer Success',
  props<{ tokenLayer: Update<TokenLayer> }>()
);

export const updateTokenLayerFailure = createAction(
  '[TokenLayer API] Update TokenLayer Failure',
  props<{ error: any }>()
);

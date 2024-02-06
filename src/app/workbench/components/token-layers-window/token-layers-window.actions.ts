import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { TokenLayer } from '@workbench/interfaces';

export const addBasicTokenLayers = createAction(
  '[TokenLayers Window] Add Basic TokenLayers'
);

export const addTokenLayer = createAction(
  '[TokenLayers Window] Add TokenLayer',
  props<{ tokenLayer: TokenLayer }>()
);

export const closeTokenLayersWindow = createAction(
  '[TokenLayers Window] Windows Closed'
);

export const removeTokenLayer = createAction(
  '[TokenLayers Window] Remove TokenLayer',
  props<{ id: number }>()
);

export const selectTokenLayer = createAction(
  '[TokenLayers Window] Select TokenLayer',
  props<{ id: number }>()
);

export const updateTokenLayer = createAction(
  '[TokenLayers Window] Update TokenLayer',
  props<{ tokenLayer: Update<TokenLayer> }>()
);

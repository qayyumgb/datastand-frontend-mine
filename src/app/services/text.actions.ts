import { createAction, props } from '@ngrx/store';

import { Text } from '@app/interfaces';
import { TokenLayer } from '@app/workbench/interfaces';

export const addBasicTokenLayersSuccess = createAction(
  '[Text API] Add Basic TokenLayers Success',
  props<{ tokenLayers: TokenLayer[] }>()
);

export const addBasicTokenLayersFailure = createAction(
  '[Text API] Add Basic TokenLayers Success',
  props<{ error: any }>()
);

export const loadTextFailure = createAction(
  '[Text API] Load Text Failure',
  props<{ error: any }>()
);

export const loadTextSuccess = createAction(
  '[Text API] Load Text Success',
  props<{ taskText: Text }>()
);

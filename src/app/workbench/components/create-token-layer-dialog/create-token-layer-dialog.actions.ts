import { createAction, props } from '@ngrx/store';

import { TokenLayer } from '@workbench/interfaces';

export const addTokenLayer = createAction(
  '[CreateTokenLayer Dialog] Add TokenLayer',
  props<{ tokenLayer: Partial<TokenLayer> }>()
);

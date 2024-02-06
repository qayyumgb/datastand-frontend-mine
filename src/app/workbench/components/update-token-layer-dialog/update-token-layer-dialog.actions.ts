import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { TokenLayer } from '@workbench/interfaces';

export const updateTokenLayer = createAction(
  '[UpdateTokenLayer Dialog] Update TokenLayer',
  props<{ update: Update<TokenLayer> }>()
);

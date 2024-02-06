import { createAction, props } from '@ngrx/store';

export const removeAllTokenBoundaries = createAction(
  '[ClearAllTokens Dialog] All TokenBoundaries Removed',
  props<{ tokenLayerId: number }>()
);

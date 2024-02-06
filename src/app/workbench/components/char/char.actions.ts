import { createAction, props } from '@ngrx/store';

export const addTokenBoundary = createAction(
  '[Char Component] TokenBoundary Added',
  props<{ tokenLayerId: number; boundary: number }>()
);

export const removeTokenBoundary = createAction(
  '[Char Component] TokenBoundary Removed',
  props<{ tokenLayerId: number; boundary: number }>()
);

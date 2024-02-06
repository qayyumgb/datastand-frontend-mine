import { createAction, props } from '@ngrx/store';

export const closeCommentsWindow = createAction(
  '[Comments Window] Window Closed'
);

export const selectComment = createAction(
  '[Comments Window] Select Comment',
  props<{ id: number }>()
);

export const removeComment = createAction(
  '[Comments Window] Remove Comment',
  props<{ id: number }>()
);

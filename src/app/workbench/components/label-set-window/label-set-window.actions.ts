import { createAction, props } from '@ngrx/store';

export const closeLabelSetWindow = createAction(
  '[LabelSet Window] Window Closed'
);

export const removeLabel = createAction(
  '[LabelSet Window] Remove Label',
  props<{ id: number }>()
);

export const selectLabel = createAction(
  '[LabelSet Window] Select Label',
  props<{ labelId: number }>()
);

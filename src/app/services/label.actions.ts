import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Label } from '@app/interfaces';

export const addLabelSuccess = createAction(
  '[Label API] Label Added Succesfully',
  props<{ label: Label }>()
);

export const addLabelFailure = createAction(
  '[Label API] Add Label Failure',
  props<{ error: any }>()
);

export const loadLabelsSuccess = createAction(
  '[Label API] Load Labels Success',
  props<{ labels: Label[] }>()
);

export const loadLabelsFailure = createAction(
  '[Label API] Load Labels Failure',
  props<{ error: any }>()
);

export const removeLabelSuccess = createAction(
  '[Label API] Remove Label Success',
  props<{ id: number }>()
);

export const removeLabelFailure = createAction(
  '[Label API] Remove Label Failure',
  props<{ error: any }>()
);

export const updateLabelSuccess = createAction(
  '[Label API] Update Label Success',
  props<{ label: Update<Label> }>()
);

export const updateLabelFailure = createAction(
  '[Label API] Update Label Failure',
  props<{ error: any }>()
);

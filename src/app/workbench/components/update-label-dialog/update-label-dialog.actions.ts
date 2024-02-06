import { Label } from '@app/interfaces';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const updateLabel = createAction(
  '[UpdateLabel Dialog] Update Label',
  props<{ label: Update<Label> }>()
);

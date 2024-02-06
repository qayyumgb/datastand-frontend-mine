import { Label } from '@app/interfaces';
import { createAction, props } from '@ngrx/store';

export const addLabel = createAction(
  '[CreateLabel Dialog] Add Label',
  props<{ label: Partial<Label> }>()
);

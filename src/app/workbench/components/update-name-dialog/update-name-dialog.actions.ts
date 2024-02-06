import { createAction, props } from '@ngrx/store';

export const updateTextTitle = createAction(
  '[UpdateName Dialog] Text Title Updated',
  props<{ name: string }>()
);

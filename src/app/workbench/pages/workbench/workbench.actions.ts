import { createAction, props } from '@ngrx/store';

export const selectTab = createAction(
  '[WorkbenchComponent] Workbench Tab Selected',
  props<{ id: number }>()
);

export const loadTaskData = createAction(
  '[WorkbenchComponent] Load Task Data',
  props<{ taskId: number; taskTextId: number }>()
);

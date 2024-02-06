import { createAction, props } from '@ngrx/store';

import { Span } from '@workbench/interfaces';

export const acceptSuggestions = createAction(
  '[Annotations Tab] Accept Suggestions'
);

export const addSpan = createAction(
  '[Annotations Tab] Add Span',
  props<{ span: Span }>()
);

export const rejectSuggestions = createAction(
  '[Annotations Tab] Reject Suggestions'
);

export const runAnnotator = createAction(
  '[Annotations Tab] Run Annotator',
  props<{ annotatorId: string }>()
);

export const selectLabelFromKeyboard = createAction(
  '[Annotations Tab] Select Label (Keyboard)',
  props<{ labelIndex: number }>()
);

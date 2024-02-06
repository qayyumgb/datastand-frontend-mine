import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Span } from '@workbench/interfaces';

export const updateSpan = createAction(
  '[SpanComponent] Update Span',
  props<{ span: Update<Span> }>()
);

export const acceptSuggestion = createAction(
  '[SpanComponent] Accept Suggestion',
  props<{ id: number }>()
);

export const removeSpan = createAction(
  '[SpanComponent] Remove Span',
  props<{ id: number }>()
);

export const acceptSuggestions = createAction(
  '[SpanComponent] Accept Suggestions'
);

export const rejectSuggestions = createAction(
  '[SpanComponent] Reject Suggestions'
);

export const runAnnotator = createAction(
  '[SpanComponent] Run Annotator',
  props<{ annotatorId: string }>()
);

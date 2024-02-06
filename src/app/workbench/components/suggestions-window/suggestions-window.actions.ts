import { createAction, props } from '@ngrx/store';

export const acceptSuggestions = createAction(
  '[Suggestions Window] Accept Suggestions'
);

export const annotateSimilarSpans = createAction(
  '[Suggestions Window] Annotate Similar Spans',
  props<{ id: number }>()
);

export const closeSuggestionsWindow = createAction(
  '[Suggestions Window] Window Closed'
);

export const rejectSuggestions = createAction(
  '[Suggestions Window] Reject Suggestions'
);

export const runAnnotator = createAction(
  '[Suggestions Window] Run Annotator',
  props<{ annotatorId: string }>()
);

export const selectAnnotator = createAction(
  '[Suggestions Window] Annotator Selected',
  props<{ id: string }>()
);

export const toggleRunAutomatically = createAction(
  '[Suggestions Window] RunAutomatically Toggled'
);

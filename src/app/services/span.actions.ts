import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Span } from '@workbench/interfaces';

export const acceptSuggestionSuccess = createAction(
  '[Span API] Accept Suggestion Success',
  props<{ span: Span }>()
);

export const acceptSuggestionFailure = createAction(
  '[Span API] Accept Suggestion Failure',
  props<{ error: any }>()
);

export const acceptSuggestionsSuccess = createAction(
  '[Suggestions Window] Suggestions Accepted',
  props<{ spans: Span[] }>()
);

export const addSpanSuccess = createAction(
  '[Span API] Span Added Succesfully',
  props<{ span: Update<Span> }>()
);

export const addSpanFailure = createAction(
  '[Span API] Add Span Failure',
  props<{ id: number; error: string }>()
);

export const removeSpanSuccess = createAction(
  '[Span API] Remove Span Success',
  props<{ id: number }>()
);

export const removeSpanFailure = createAction(
  '[Span API] Remove Span Failure',
  props<{ error: any }>()
);

export const loadSpansSuccess = createAction(
  '[Span API] Load Spans Success',
  props<{ spans: Span[] }>()
);

export const loadSpansFailure = createAction(
  '[Span API] Load Spans Failure',
  props<{ error: any }>()
);

export const rejectSuggestionsSuccess = createAction(
  '[Span API] Suggestions Rejected',
  props<{ spans: Span[] }>()
);

export const runAnnotatorSuccess = createAction(
  '[Span API] Annotator Run Succesfully',
  props<{ spans: Span[] }>()
);

export const annotateSimilarSpansSuccess = createAction(
  '[Span API] Annotate Similar Spans Success',
  props<{ spans: Span[] }>()
);

export const refreshSpans = createAction('[Span API] Refresh Spans');

export const refreshSpansSuccess = createAction(
  '[Span API] Refresh Spans Success',
  props<{ spans: Span[] }>()
);

export const refreshSpansFailure = createAction(
  '[Span API] Refresh Spans Failure',
  props<{ error: any }>()
);

export const runAnnotatorFailure = createAction(
  '[Span API] Annotator Run Failure',
  props<{ error: string }>()
);

export const runAnnotatorNoOp = createAction('[Span API] Annotator Run No-op');

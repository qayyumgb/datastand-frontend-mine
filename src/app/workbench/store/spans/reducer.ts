import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { CallState, LoadingState } from '@app/interfaces';
import { SpanApiActions } from '@app/services';
import {
  AnnotationsTabActions,
  ClearAllAnnotationsDialogActions,
  SpanActions,
  WorkbenchActions,
} from '@workbench/actions';
import { Span, SpanStatus } from '@workbench/interfaces';

export const spansFeatureKey = 'spans';

export interface SpansState extends EntityState<Span> {
  callState: CallState;
}

export const adapter: EntityAdapter<Span> = createEntityAdapter<Span>();

export const initialState: SpansState = adapter.getInitialState({
  callState: LoadingState.INIT,
});

export const spansReducer = createReducer(
  initialState,
  on(AnnotationsTabActions.addSpan, (state, action) =>
    adapter.addOne(action.span, state)
  ),
  on(SpanApiActions.addSpanSuccess, (state, action) =>
    adapter.updateOne(action.span, state)
  ),
  on(SpanApiActions.addSpanFailure, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(
    SpanApiActions.runAnnotatorSuccess,
    SpanApiActions.annotateSimilarSpansSuccess,
    (state, action) => adapter.addMany(action.spans, state)
  ),
  on(SpanActions.updateSpan, (state, action) =>
    adapter.updateOne(action.span, state)
  ),
  on(SpanApiActions.acceptSuggestionSuccess, (state, action) =>
    adapter.updateOne(
      { id: action.span.id, changes: { ...action.span } },
      state
    )
  ),
  on(SpanApiActions.removeSpanSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(
    SpanApiActions.rejectSuggestionsSuccess,
    SpanApiActions.acceptSuggestionsSuccess,
    SpanApiActions.loadSpansSuccess,
    SpanApiActions.refreshSpansSuccess,
    (state, action) =>
      adapter.setAll(action.spans, { ...state, callState: LoadingState.LOADED })
  ),
  on(ClearAllAnnotationsDialogActions.removeAllAnnotations, (state) =>
    adapter.removeAll(state)
  ),
  on(SpanActions.acceptSuggestion, (state, { id: spanId }) =>
    adapter.updateOne(
      {
        id: spanId,
        changes: {
          status: SpanStatus.Accepted,
          suggestion_status: SpanStatus.Accepted,
        },
      },
      state
    )
  ),
  // Clear the store when loading new data.
  on(WorkbenchActions.loadTaskData, () => ({
    ...initialState,
    callState: LoadingState.LOADING,
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
